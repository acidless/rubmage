import { Selector } from 'react-redux';
import { AppStateType } from '../../store';
import IDialog from '../../../types/Content/IDialog';

export const GetDialogsSelector: Selector<AppStateType, Array<IDialog> | null> = (state) => state.dialogs.dialogs;

export const GetCurrentDialogSelector: Selector<AppStateType, IDialog | null> = (state) => state.dialogs.currentDialog;
