import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wordList: [{ type: mongoose.Types.ObjectId, ref: 'WordList' }],
});

export default mongoose.model('User', UserSchema);
