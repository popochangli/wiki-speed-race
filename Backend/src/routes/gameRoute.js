import express from "express";

import * as gameController from "../controllers/gameController.js";

const router = express.Router();

router.post("/rooms/createRoom", gameController.createRoom);
router.post("/rooms/:id/join", gameController.joinRoom);
router.get("/rooms/:id", gameController.getRoom);
router.post('/rooms/:roomId/setStart', gameController.setStart);
router.post('/rooms/:roomId/setGoal', gameController.setGoal);
router.post('/rooms/:roomId/timeLimit', gameController.setTimeLimit);
router.post('/rooms/:roomId/kick', gameController.kickUser);
router.post('/rooms/:roomId/nextPage', gameController.nextPage);


export default router;