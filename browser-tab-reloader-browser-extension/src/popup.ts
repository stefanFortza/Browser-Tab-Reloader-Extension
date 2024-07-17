// import browser from "webextension-polyfill";
import { io } from "socket.io-client";

// console.log("Hello from the popup!", { id: browser.runtime.id });

const socket = io("http://localhost:3000");
// // socket.connect();
socket.on("connect", () => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

console.log(socket);
socket.emit("ping");
console.log("emitted ping");

console.log(window.location);

const btn = document.querySelector<HTMLButtonElement>("button");
if (btn) {
  btn.addEventListener("click", () => {
    console.log("ping");
    socket.emit("ping");
  });
}
