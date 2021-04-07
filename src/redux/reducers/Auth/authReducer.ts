import ActionsType, { DispatchActions } from './../Types';
import { Dispatch, Reducer } from 'react';
import AuthAPI from '../../../API/AuthAPI/AuthAPI';
import catchThunk from '../../../utils/catchAsync';
import { ErrorActions } from '../Error/ErrorReducer';
import IUser from '../../../types/Content/IUser';
import { LoginFormValues, RegisterFormValues } from '../../../types/FormValues/LoginValues';

/*====================*/

const SET_AUTH = 'Rubmage/Auth/SET-AUTH';
const SET_LOADING_STATUS = 'Rubmage/Auth/SET-LOADING-STATUS';
const SET_CURRENT_USER = 'Rubmage/Auth/SET-CURRENT-USER';

/*====================*/

const initState = {
  isAuth: false,
  isLoading: false,
  currentUser: null as null | IUser,
};
type AuthStateType = typeof initState;

/*====================*/

type Actions = ActionsType<typeof AuthActions>;

/*====================*/

const AuthReducer: Reducer<AuthStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload.value,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload.value,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user,
      };
    default:
      return state;
  }
};

/*====================*/

export const AuthActions = {
  setAuth(value: boolean) {
    return <const>{ type: SET_AUTH, payload: { value } };
  },
  setLoadingStatus(value: boolean) {
    return <const>{ type: SET_LOADING_STATUS, payload: { value } };
  },
  setCurrentUser(user: IUser) {
    return <const>{ type: SET_CURRENT_USER, payload: { user } };
  },
};

/*====================*/

function _AuthHelper(response: any, dispatch: DispatchActions<any>) {
  if (response.success) {
    dispatch(AuthActions.setAuth(true));
    dispatch(AuthActions.setCurrentUser(response.data.user));
    localStorage.setItem('token', `Bearer ${response.data.token}`);
  } else {
    dispatch(ErrorActions.setError(response.message));
  }
}

export function Register(formValues: RegisterFormValues) {
  return catchThunk(async function RegisterThunk(dispatch: Dispatch<DispatchActions<Actions>>) {
    dispatch(AuthActions.setLoadingStatus(true));

    const response = await AuthAPI.register(formValues);

    _AuthHelper(response, dispatch);

    dispatch(AuthActions.setLoadingStatus(false));
  });
}

export function LoginF(formValues: LoginFormValues) {
  return catchThunk(async function LoginThunk(dispatch: Dispatch<DispatchActions<Actions>>) {
    dispatch(AuthActions.setLoadingStatus(true));

    const response = await AuthAPI.login(formValues);

    _AuthHelper(response, dispatch);

    dispatch(AuthActions.setLoadingStatus(false));
  });
}

export function Auth() {
  return catchThunk(async function AuthThunk(dispatch: Dispatch<DispatchActions<Actions>>) {
    const response = await AuthAPI.auth();

    if (response.success) {
      dispatch(AuthActions.setAuth(true));
      dispatch(AuthActions.setCurrentUser(response.data));
    }
  });
}

/*====================*/

export default AuthReducer;
