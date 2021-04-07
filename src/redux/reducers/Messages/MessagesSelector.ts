import { Selector } from 'react-redux';
import { AppStateType } from '../../store';
import IMessage from '../../../types/Content/IMessage';

/*====================*/

export const GetCurrentMessages: Selector<AppStateType, Array<IMessage>> = (state) => state.messages.currentMessages;

export const GetMessagesLoadingStatus: Selector<AppStateType, boolean> = (state) => state.messages.isLoading;
