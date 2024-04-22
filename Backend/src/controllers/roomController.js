import Room from '../models/room.js';
import User from '../models/user.js';


export const createRoom = async (req, res) => {
  const gameEndStatus = false;
  const waitingStatus = true;
  const start = '';
  const goal = '';
  const timeLimit = 300;
  let roomId;
  while(true){
    roomId = Math.max(100000 + Math.floor(Math.random() * 900000) - 1);
    if(await Room.findOne({ roomId : roomId }) == null){
      break;
    }
  }

  try{

    const newRoom = new Room({ 
      roomId : roomId, 
      gameEndStatus : gameEndStatus, 
      waitingStatus : waitingStatus,
      start: start,
      goal: goal,
      timeLimit: timeLimit
    });
    await newRoom.save();
    res.status(201).json(newRoom);

  } catch (error) {
    
    res.status(409).json({ message: error.message });
  }
}

export const createUser = async (req, res) => {
  const start = '';
  const goal = '';
  let roomId;
  while(true){
    roomId = Math.max(1000 + Math.floor(Math.random() * 9000) - 1);
    if(await Room.findOne({ roomId : roomId }) == null){
      break;
    }
  }

  try{

    const newUser = new User({ 
      roomId : roomId, 
      gameEndStatus : gameEndStatus, 
      waitingStatus : waitingStatus,
      start: start,
      goal: goal,
      timeLimit: timeLimit
    });
    await newRoom.save();
    res.status(201).json(newRoom);

  } catch (error) {
    
    res.status(409).json({ message: error.message });
  }
}