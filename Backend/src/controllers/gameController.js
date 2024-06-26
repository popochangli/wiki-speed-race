import Room from "../models/room.js";
import User from "../models/user.js";

export const createUser = async (req, res) => {
  const { name } = req.body;

  let userId;
  while (true) {
    userId = Math.max(1000 + Math.floor(Math.random() * 9000) - 1);
    if ((await User.findOne({ userId: userId })) == null) {
      break;
    }
  }
  try {
    const newUser = new User({
      name: name,
      userId: userId,
      totalArticle: [],
      start: "",
      goal: "",
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  let roomId;
  while (true) {
    roomId = Math.max(100000 + Math.floor(Math.random() * 900000) - 1);
    if ((await Room.findOne({ roomId: roomId })) == null) {
      break;
    }
  }
  try {
    const newUser = await createUser(req, res);
    const start = [
      "Bed",
      "Earth",
      "Gold",
      "Emerald",
      "Diamond",
      "Arsenal",
      "Binary tree",
      "Apple",
      "Intel",
      "Bidet",
    ];
    const goal = [
      "Oxygen",
      "Minecraft",
      "One piece",
      "Thailand",
      "Bangkok",
      "Chelsea",
      "Dragonball",
      "Github",
      "Male",
      "Lionel Messi",
    ];
    const newRoom = new Room({
      roomId: roomId,
      gameEndStatus: false,
      waitingStatus: true,
      gameMasterId: newUser._id,
      users: [{ user: newUser._id, status: false, name: newUser.name }],
      start: start[Math.floor(Math.random() * start.length)],
      goal: goal[Math.floor(Math.random() * goal.length)],
      timeLimit: 300,
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getRoom = async (req, res) => {
  const roomId = req.params.id;
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
    throw new Error("Database error when fetching room");
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

    room.users.push({ user: newUser._id, status: false, name: newUser.name });
    await room.save();

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setStart = async (req, res) => {
  const { roomId } = req.params;
  const { start } = req.body;
  console.log(start);
  try {
    const room = await Room.findOneAndUpdate(
      { roomId: roomId },
      { start: start },
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const userIds = room.users.map((user) => user.user);
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
    const room = await Room.findOneAndUpdate(
      { roomId: roomId },
      { goal: goal },
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const userIds = room.users.map((user) => user.user);
    await User.updateMany({ _id: { $in: userIds } }, { goal: goal });

    res.json({ room: room, message: "Goal updated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setTimeLimit = async (req, res) => {
  const { roomId } = req.params;
  const { timeLimit } = req.body;

  if (!timeLimit || typeof timeLimit !== "number") {
    return res.status(400).json({
      message: "Invalid timeLimit provided. Please provide a valid number.",
    });
  }

  try {
    const room = await Room.findOneAndUpdate(
      { roomId: roomId },
      { timeLimit: timeLimit },
      { new: true, runValidators: true }
    );

    if (!room) {
      return res
        .status(404)
        .json({ message: "Room not found with provided ID" });
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
      { $pull: { users: { user: userId } } },
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

export const nextPage = async (req, res) => {
  const { roomId } = req.params;
  const { userId, newPage } = req.body; // userId = _Id

  if (!newPage) {
    return res.status(400).json({ message: "No page provided!" });
  }
  try {
    const currentRoom = await Room.findOne({ roomId: roomId });
    const checkUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { totalArticle: newPage } },
      { new: true }
    );
    if (!currentRoom) {
      return res.status(401).json({ message: "Room doesn't exist!" });
    }
    if (!checkUser) {
      return res.status(401).json({ message: "User doesn't exist!" });
    }

    let room = await Room.findOne({ roomId: roomId });

    if (room.goal.toLowerCase() === newPage.toLowerCase()) {
      // Update the user's status in the room
      const result = await Room.updateOne(
        { roomId: roomId, "users.user": userId }, // Filter to find the room by roomId and user by userId
        { $set: { "users.$.status": true } } // Update operation to set the user's status to true
      );
      console.log(`goal is equal to ${newPage}`);

      const thisRoom = await Room.findOne({ roomId: roomId });
      let isGameEnd = true;
      for (const user of thisRoom.users) {
        if (user.status === false) {
          console.log(user.status);
          isGameEnd = false;
        }
      }

      if (isGameEnd) {
        const gameEnd = await setGameEnd(roomId);
        if (gameEnd) {
          res.json({ message: `Room : ${roomId} End!!! everyone wins` });
        } else {
          res.json({ message: `Add ${newPage} acticle to ${userId}` });
        }
      } else {
        res.json({ message: `${userId} reach Goal!!!` });
      }
    } else {
      console.log(`goal does not equal ${newPage}`);
      res.json({ message: `Add ${newPage} acticle to ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function setGameEnd(roomId) {
  return Room.findOneAndUpdate(
    { roomId: roomId },
    { gameEndStatus: true },
    { new: true }
  );
}
export const timeLimitExceed = async (req, res) => {
  const { roomId } = req.params;
  try {
    const gameEnd = await setGameEnd(roomId);
    if (gameEnd) {
      res.json({ message: `Room : ${roomId} end due to time limit.` });
    } else {
      res
        .status(401)
        .json({ message: `Room : ${roomId} end not successfully` });
    }
  } catch (error) {
    res.start(500).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const result = await Room.deleteOne({ roomId: roomId });

    if (result.deletedCount > 0) {
      res.json({ message: `delete room : ${roomId} successfully` });
    } else {
      res.status(404).json({ message: `room : ${roomId} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const startGame = async (req, res) => {
  const { roomId } = req.params;
  try {
    const result = await Room.findOneAndUpdate(
      { roomId: roomId },
      { waitingStatus: false },
      { new: true }
    );
    if (result) {
      res.json({ message: `Room : ${roomId} start!!` });
    } else {
      res.status(404).json({ message: `Room : ${roomId} not found!` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
