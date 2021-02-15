import mongoose from 'mongoose';

const { Schema } = mongoose;

export const UserSchema = new Schema({
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: String,
  password: String,
  created_at: Date,
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
