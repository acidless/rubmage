import { Document } from 'mongoose';

/*====================*/

interface IUser extends Document {
  login: string;
  email: string;
  password: string;
  dialogs?: Array<string>;
  photo?: string;
  comparePasswords: (password: string, hash: string) => boolean;
}

/*====================*/

export default IUser;
