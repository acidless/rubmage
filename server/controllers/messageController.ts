import catchAsync from '../utils/catchAsync';
import Message from '../models/Messages/Message';
import JSendSerializer from '../utils/JSend/JSendSerializer';
import AppError from '../utils/AppError';

/*====================*/

const messageController = {
  sendMessage: catchAsync(async (req, res, next) => {
    const { text, dialog } = req.body;

    if (!req.currentUser.dialogs.includes(dialog)) {
      return next!(new AppError(403, 'Вы не состоите в данной беседе.'));
    }

    const message = await Message.create({
      sendAt: new Date(Date.now()).toString(),
      sender: req.currentUser._id,
      text,
      dialog,
    });

    res.status(200).json(JSendSerializer.serialize(true, message));
  }),

  getMessagesFromDialog: catchAsync(async (req, res, next) => {
    const page = req.query.p || 1;
    const selectLength = 20;

    if (!req.currentUser.dialogs.includes(req.params.dialogId)) {
      return next!(new AppError(403, 'Вы не состоите в данной беседе.'));
    }

    const messages = await Message.find({
      dialog: req.params.dialogId,
      sendAt: { $lte: new Date((req.headers['Dialog-Get-At'] as string) || Date.now()) },
    })
      .sort({ sendAt: -1 })
      .skip((+page - 1) * selectLength)
      .limit(selectLength);

    res.status(200).json(JSendSerializer.serialize(true, messages));
  }),
};

/*====================*/

export default messageController;
