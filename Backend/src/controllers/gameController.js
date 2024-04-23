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
      gameMasterId: newUser._id,
      users: [{ user: newUser._id, status: false }],
      usersStatus: {
        [newUser._id]: false
      },
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

export const getRoom = async (req, res) => {
  const  roomId  = req.params.id;
  if (!roomId || roomId.length === 0) {
      return res.status(400).json({ message: "No roomId provided" });
  }
  
  try {
      const room = await Room.findOne({ roomId: roomId });
      if (!room) {
          return res.status(404).json({ message: "Room not found" });
      }
      res.json(room);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const findRoom = async (roomId) => {
  try {
    return await Room.findOne({ roomId: roomId });
  } catch (error) {
    throw new Error('Database error when fetching room');
  }
};

export const joinRoom = async (req, res) => {
  const roomId = req.params.id;
  
  try {
    const room = await findRoom(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    
    const newUser = await createUser(req, res);
    if (!newUser) {
      return res.status(400).json({ message: "User creation failed" });
    }
  
    room.users.push({ user: newUser._id, status: false });
    await room.save();
    
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setStart = async (req, res) => {
  const { roomId } = req.params;
  const { start } = req.body;
  console.log(start)
  try {
      const room = await Room.findOneAndUpdate({ roomId: roomId }, { start: start }, { new: true });
      if (!room) {
          return res.status(404).json({ message: "Room not found" });
      }

      const userIds = room.users.map(user => user.user);
      await User.updateMany({ _id: { $in: userIds } }, { start: start });

      res.json({ room: room, message: "Start updated." });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const setGoal = async (req, res) => {
  const { roomId } = req.params;
  const { goal } = req.body;
  
  try {
      const room = await Room.findOneAndUpdate({ roomId: roomId }, { goal: goal }, { new: true });
      if (!room) {
          return res.status(404).json({ message: "Room not found" });
      }

      const userIds = room.users.map(user => user.user);
      await User.updateMany({ _id: { $in: userIds } }, { goal: goal });

      res.json({ room: room, message: "Goal updated." });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const setTimeLimit = async (req, res) => {
  const { roomId } = req.params;  
  const { timeLimit } = req.body; 

  if (!timeLimit || typeof timeLimit !== 'number') {
      return res.status(400).json({ message: "Invalid timeLimit provided. Please provide a valid number." });
  }

  try {
      const room = await Room.findOneAndUpdate(
          { roomId: roomId },
          { timeLimit: timeLimit },
          { new: true, runValidators: true } 
      );

      if (!room) {
          return res.status(404).json({ message: "Room not found with provided ID" });
      }

      res.json({ room: room, message: "Time limit updated successfully." });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const kickUser = async (req, res) => {
  const { roomId } = req.params; 
  const { userId } = req.body;

  try {
      const room = await Room.findOneAndUpdate(
          { roomId: roomId },
          { $pull: { users: { user: _id } } },
          { new: true }
      );

      if (!room) {
          return res.status(404).json({ message: "Room not found" });
      }

      res.json({ room: room, message: "User kicked successfully." });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

