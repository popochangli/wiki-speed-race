import express from "express";
import cors from "cors";
import GameRoute from "./routes/gameRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use("/game", GameRoute);

app.get("/", (req, res) =>{
    res.send("Test");
});

export default app;
