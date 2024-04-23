import { BACKEND_URL } from "./config.js";

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

// export async function createItem(item) {
//   await fetch(`${BACKEND_URL}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(item),
//   });
// }

// export async function deleteItem(id, item) {
//   await fetch(`${BACKEND_URL}/items/${id}`, {
//     method: "DELETE",
//   });
// }

// export async function filterItems(filterName, lowerPrice, upperPrice) {
//   // TODO3: implement this function
//   // You may need to understand handleFilterItem() function in ./table.js before implementing this function.

//   const items = await fetch(
//     `${BACKEND_URL}/items/filter?` +
//       new URLSearchParams({
//         filterName,
//         lowerPrice,
//         upperPrice,
//       })
//   ).then((r) => r.json());
//   return items;
// }

// export async function getMembers() {
//   // TODO4: implement this function
//   const items = await fetch(`${BACKEND_URL}/members`).then((r) => r.json());
//   return items;
// }

// export async function createMember(member) {
//   // TODO4: implement this function
//   await fetch(`${BACKEND_URL}/members`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(member),
//   });
// }

// export async function deleteMember(id, item) {
//   // TODO4: implement this function
//   await fetch(`${BACKEND_URL}/members/${id}`, {
//     method: "DELETE",
//   });
// }
