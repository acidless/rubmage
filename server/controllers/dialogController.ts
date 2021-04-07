import catchAsync from '../utils/catchAsync';
import User from '../models/User/UserModel';
import AppError from '../utils/AppError';
import JSendSerializer from '../utils/JSend/JSendSerializer';
import Dialog from '../models/Dialogs/DialogModel';

const dialogController = {
  getAllDialogs: catchAsync(async (req, res, next) => {
    const user = await User.findById(req.currentUser._id).populate({ path: 'dialogs', model: Dialog });

    if (!user) {
      return next!(new AppError(404, 'Пользователь не найден.'));
    }

    res.status(200).json(JSendSerializer.serialize(true, user.dialogs));
  }),

  getDialog: catchAsync(async (req, res, next) => {
    const dialog = await Dialog.findById(req.params.dialogId);

    if (!dialog) {
      return next!(new AppError(404, 'Беседа не найдена.'));
    }

    if (!dialog.members.includes(req.currentUser._id)) {
      return next!(new AppError(403, 'Вы не состоите в данной беседе.'));
    }

    res.status(200).json(JSendSerializer.serialize(true, dialog));
  }),
};

/*====================*/

export default dialogController;
