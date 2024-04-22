import express from "express";

import * as roomController from "../controllers/roomController.js";

const router = express.Router();

router.post("/room", roomController.createRoom); 


export default router;