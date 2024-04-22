import express from "express";

import * as gameController from "../controllers/gameController.js";

const router = express.Router();

router.post("/room", gameController.createRoom);
router.post("/users", gameController.createUser); 


export default router;