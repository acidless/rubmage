import IUser from './IUser';

/*====================*/

interface IDialog {
  members: Array<IUser>;
  name?: string;
  _id: string;
  photo?: string;
  isPrivate: true;
}

/*====================*/

export default IDialog;
