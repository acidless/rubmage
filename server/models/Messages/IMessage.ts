import { Document } from 'mongoose';

/*====================*/

interface IMessage extends Document {
  sender: string;
  text: string;
  dialog: string;
  sendAt?: Date;
}

/*====================*/

export default IMessage;
