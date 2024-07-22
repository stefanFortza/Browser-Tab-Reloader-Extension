import browser from "webextension-polyfill";
import { io } from "socket.io-client";

console.log("Hello from the background!");

// console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {});

browser.tabs.onUpdated.addListener(async (id, info) => {
  console.log(id, info);
  console.log(await browser.storage.session.get("tabs"));
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await browser.tabs.query(queryOptions);
  return tab;
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender);
  getCurrentTab().then((tab) => {
    browser.tabs.reload(tab.id!);
  });
});
