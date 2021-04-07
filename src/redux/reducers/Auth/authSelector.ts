import { Selector } from 'react-redux';
import { AppStateType } from '../../store';
import IUser from '../../../types/Content/IUser';

/*====================*/

export const GetAuthStatus: Selector<AppStateType, boolean> = (state) => state.auth.isAuth;

export const GetLoadingStatus: Selector<AppStateType, boolean> = (state) => state.auth.isLoading;

export const GetCurrentUser: Selector<AppStateType, IUser | null> = (state) => state.auth.currentUser;
