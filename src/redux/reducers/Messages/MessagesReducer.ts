import IMessage from '../../../types/Content/IMessage';
import ActionsType, { DispatchActions } from '../Types';
import { Dispatch, Reducer } from 'redux';
import catchThunk from '../../../utils/catchAsync';
import MessagesAPI from '../../../API/MessagesAPI/MessagesAPI';
import { ErrorActions } from '../Error/ErrorReducer';

/*====================*/

const SET_MESSAGES = 'Rubmage/Messages/SET-MESSAGES';
const ADD_MESSAGE = 'Rubmage/Messages/ADD-MESSAGE';
const SET_LOADING_STATUS = 'Rubmage/Messages/SET_LOADING_STATUS';

/*====================*/

const initState = {
  currentMessages: [] as Array<IMessage>,
  isLoading: false,
};
type MessagesStateType = typeof initState;

/*====================*/

type Actions = ActionsType<typeof MessagesActions>;

/*====================*/

const MessagesReducer: Reducer<MessagesStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        currentMessages: action.payload.messages,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        currentMessages: [...state.currentMessages, action.payload.message],
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload.value,
      };
    default:
      return state;
  }
};

/*====================*/

export const MessagesActions = {
  setMessages(messages: Array<IMessage>) {
    return <const>{ type: SET_MESSAGES, payload: { messages } };
  },
  addMessage(message: IMessage) {
    return <const>{ type: ADD_MESSAGE, payload: { message } };
  },
  setLoading(value: boolean) {
    return <const>{ type: SET_LOADING_STATUS, payload: { value } };
  },
};

export function GetMessages(page: number) {
  return catchThunk(async (dispatch: Dispatch<DispatchActions<Actions>>, getState: any) => {
    const dialogId = getState().dialogs.currentDialog._id;

    if (page === 1) {
      dispatch(MessagesActions.setMessages([]));
    }

    dispatch(MessagesActions.setLoading(true));

    const response = await MessagesAPI.getMessages(dialogId, page);

    if (response.success) {
      dispatch(MessagesActions.setMessages([...response.data, ...getState().messages.currentMessages]));
    } else {
      dispatch(ErrorActions.setError('Произошла ошибка при получении сообщений.'));
    }

    dispatch(MessagesActions.setLoading(false));
  });
}

export function SendMessage(message: IMessage) {
  return catchThunk(async (dispatch: Dispatch<DispatchActions<Actions>>, getState) => {
    const response = await MessagesAPI.sendMessage(message);

    if (response.success) {
      dispatch(MessagesActions.addMessage(response.data));
    } else {
      dispatch(ErrorActions.setError('Произошла ошибка при отправке сообщения.'));
    }
  });
}

/*====================*/

export default MessagesReducer;
