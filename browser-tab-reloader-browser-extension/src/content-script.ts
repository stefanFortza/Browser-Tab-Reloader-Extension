import { io } from "socket.io-client";
import browser from "webextension-polyfill";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

console.log(socket);
socket.emit("ping");
console.log("emitted ping");
socket.on("change", () => {
  browser.runtime.sendMessage("change");
});

// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }
console.log("yes");
