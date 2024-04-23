import { BACKEND_URL } from "./config.js";

export async function kick(roomId, userId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "userId": userId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${BACKEND_URL}/game/rooms/${roomId}/kick`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export async function getRoom(roomId) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const temp = await fetch(
    `${BACKEND_URL}/game/rooms/${roomId}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return temp;
}

export async function joinRoom(userName, roomId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "name": userName,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const temp = await fetch(
    `${BACKEND_URL}/game/rooms/${roomId}/join`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return temp;
}

export async function createRoom(name) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "name": name,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const temp = await fetch(
    `${BACKEND_URL}/game/rooms/createRoom`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return temp;
}
