import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/joinRoom", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "./pages/JoinRoom/JoinRoom.html")
  );
});
app.get("/CreateNewGame", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "./pages/CreateNewGame/CreateNewGame.html")
  );
});

app.get("/WaitingRoom", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "./pages/WaitingRoom/WaitingRoom.html")
  );
});

app.get("/GamePlay", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "./pages/GamePlay/GamePlay.html")
  );
});

const PORT = 3221;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend Server ready at http://localhost:${PORT}`);
});
