import { Document } from 'mongoose';

interface IDialog extends Document {
  name?: string;
  members: Array<string>;
  isPrivate: boolean;
  photo?: string;
}

/*====================*/

export default IDialog;
