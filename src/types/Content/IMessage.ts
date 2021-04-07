interface IMessage {
  _id?: string;
  sender?: string;
  text: string;
  dialog: string;
  sendAt?: Date;
}

/*====================*/

export default IMessage;
