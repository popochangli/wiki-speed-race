import mongoose from 'mongoose'; 
import User from './user.js';

const roomSchema = new mongoose.Schema({

  roomId: {
    type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 6,
  },
  gameEndStatus: {
    type: Boolean,
    required: true
  },
  waitingStatus: {
    type: Boolean,
    required: true
  },
  gameMasterId: {
    type: String,
    require: false
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: false
  }, 
  start: {
    type: String,
    require: true
  },
  goal: {
    type: String,
    require: true
  },
  timeLimit: {
    type: Number,
    require: true
  }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
