import mongoose from 'mongoose';
import IMessage from './IMessage';

/*====================*/

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  dialog: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Dialog',
    required: true,
  },
  sendAt: {
    type: Date,
    default: Date.now(),
    index: { expires: '7d' },
  },
});

/*====================*/

const Message = mongoose.model<IMessage>('Message', messageSchema, 'messages');

/*====================*/

export default Message;
