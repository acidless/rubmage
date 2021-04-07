import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import IUser from './IUser';

/*====================*/

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    minlength: 3,
    maxlength: 12,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  dialogs: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Dialog' }],

  password: {
    type: String,
    required: true,
    select: false,
  },

  photo: {
    type: String,
    default: 'https://i.postimg.cc/nLrH41sH/user.png',
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, 12);
  }

  next(null);
});

userSchema.methods.comparePasswords = async function (password: string, userPassword: string) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model<IUser>('User', userSchema, 'users');

/*====================*/

export default User;
