import Http from '../Http';
import IUser from '../../types/Content/IUser';
import { LoginFormValues, RegisterFormValues } from '../../types/FormValues/LoginValues';
import JSONResponse from '../../types/Response/ResponsesTypes';

/*====================*/

type ReturnType = {
  token: string;
  user: IUser;
};

const AuthAPI = {
  register(values: RegisterFormValues): Promise<JSONResponse<ReturnType>> {
    return Http.request('POST', '/api/auth/register', { ...values });
  },

  login(values: LoginFormValues): Promise<JSONResponse<ReturnType>> {
    return Http.request('POST', '/api/auth/login', { ...values });
  },

  auth(): Promise<JSONResponse<IUser>> {
    return Http.request('POST', '/api/auth/auth');
  },
};

/*====================*/

export default AuthAPI;
