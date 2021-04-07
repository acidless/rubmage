import IDialog from '../../../types/Content/IDialog';
import { Dispatch, Reducer } from 'redux';
import ActionsType, { DispatchActions } from '../Types';
import catchThunk from '../../../utils/catchAsync';
import DialogsAPI from '../../../API/DialogsAPI/DialogsAPI';
import { ErrorActions } from '../Error/ErrorReducer';

/*====================*/

const SET_DIALOGS = 'Rubmage/Dialogs/SET_DIALOGS';
const SET_CURRENT_DIALOG = 'Rubmage/Dialogs/SET_CURRENT_DIALOG';

/*====================*/

const initState = {
  dialogs: null as Array<IDialog> | null,
  currentDialog: null as IDialog | null,
};

type DialogsStateType = typeof initState;

/*====================*/

type Actions = ActionsType<typeof DialogsActions>;

/*====================*/

const DialogsReducer: Reducer<DialogsStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_DIALOGS:
      return {
        ...state,
        dialogs: action.payload.dialogs,
      };
    case SET_CURRENT_DIALOG:
      return {
        ...state,
        currentDialog: action.payload.dialog,
      };
    default:
      return state;
  }
};

/*====================*/

const DialogsActions = {
  setDialogs(dialogs: Array<IDialog>) {
    return <const>{ type: SET_DIALOGS, payload: { dialogs } };
  },
  setCurrentDialog(dialog: IDialog) {
    return <const>{ type: SET_CURRENT_DIALOG, payload: { dialog } };
  },
};

/*====================*/

export function GetDialogs() {
  return catchThunk(async (dispatch: Dispatch<DispatchActions<Actions>>) => {
    const response = await DialogsAPI.getDialogs();
    if (response.success) {
      dispatch(DialogsActions.setDialogs(response.data));
    } else {
      dispatch(ErrorActions.setError('Произошла ошибка при получении диалогов.'));
    }
  });
}

export function GetCurrentDialog(id: string) {
  return catchThunk(async (dispatch: Dispatch<DispatchActions<Actions>>) => {
    const response = await DialogsAPI.getDialog(id);

    if (response.success) {
      dispatch(DialogsActions.setCurrentDialog(response.data));
      localStorage.setItem('DialogGetAt', new Date(Date.now()).toUTCString());
    } else {
      dispatch(ErrorActions.setError('Произошла ошибка при загрузке беседы.'));
    }
  });
}

/*====================*/

export default DialogsReducer;
