import Room from '../models/room.js';
import User from '../models/user.js';

export const createUser = async (req, res) => {
  const { name } = req.body;
  let userId;
  while (true) {
    userId = Math.max(1000 + Math.floor(Math.random() * 9000) - 1);
    if (await User.findOne({ userId: userId }) == null) {
      break;
    }
  }
  try {
    const newUser = new User({
      name: name,
      userId: userId,
      totalArticle: [],
      start: '',
      goal: '',
    });
    await newUser.save();
    res.status(200).json(newUser);
    return newUser;
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const createRoom = async (req, res) => {
  let roomId;
  while (true) {
    roomId = Math.max(100000 + Math.floor(Math.random() * 900000) - 1);
    if (await Room.findOne({ roomId: roomId }) == null) {
      break;
    }
  }
  try {
    const newUser = await createUser(req, res);
    const newRoom = new Room({
      roomId: roomId,
      gameEndStatus: false,
      waitingStatus: true,
      gameMasterId: newUser.userId,
      users: [newUser._id],
      start: '',
      goal: '',
      timeLimit: 300
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
