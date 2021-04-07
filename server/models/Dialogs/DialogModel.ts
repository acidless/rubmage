import mongoose from 'mongoose';
import IDialog from './IDialog';

/*====================*/

const DialogSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 32,
  },
  members: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  isPrivate: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
  },
});

/*====================*/

const Dialog = mongoose.model<IDialog>('Dialog', DialogSchema, 'dialogs');

/*====================*/

export default Dialog;
