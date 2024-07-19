import browser from "webextension-polyfill";
import { io } from "socket.io-client";

// console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender);
  getCurrentTab().then((tab) => {
    chrome.tabs.reload(tab.id!);
  });
});
