import express from "express";

import * as gameController from "../controllers/gameController.js";

const router = express.Router();

router.post("/room", gameController.createRoom);
router.post("/room/:id/join", gameController.joinRoom);
router.get("/room/:id", gameController.getRoom);


export default router;