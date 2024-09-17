import browser from "webextension-polyfill";
import {
  addTabToStorage,
  getActiveTab,
  getTabsFromStorage,
  removeTabFromStorage,
} from "./utils";

console.log("Hello from the background!");

declare global {
  interface Window {
    scriptInjected: boolean;
  }
}

// console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {});

browser.tabs.onUpdated.addListener(async (id, info) => {
  // console.log(id, info);
  if (info.status === "complete") {
    const tabs = await getTabsFromStorage();
    if (tabs.some((t) => t.id === id)) {
      // Inject a small script to check if the main scriptl has already been injected
      const [result] = await browser.scripting.executeScript({
        target: { tabId: id, allFrames: true },
        func: () => {
          if (window.scriptInjected) {
            return { alreadyInjected: true };
          }
          window.scriptInjected = true;
          return { alreadyInjected: false };
        },
      });
      console.log(result);

      // If the script has not already been injected, inject the main content script
      if (!result.result.alreadyInjected) {
        injectScript(id);
      }
    }
  }
});

browser.tabs.onRemoved.addListener(async (id, info) => {
  console.log(id, info);
  await removeTabFromStorage(id);
});

async function injectScript(tabId: number) {
  await browser.scripting.executeScript({
    target: { tabId, allFrames: true },
    files: ["src/content-script.js"],
  });

  if (__BROWSER__ === "firefox") {
    await browser.browserAction.setIcon({ path: "../icon/128.png", tabId });
  } else {
    await browser.action.setIcon({ path: "../icon/128.png", tabId });
  }
  console.log("changed");
}

browser.runtime.onMessage.addListener(
  async (
    message: "activate_tab" | "change" | "deactivate_tab",
    sender,
    sendResponse
  ) => {
    console.log(message, sender);

    if (message === "activate_tab") {
      const activeTab = await getActiveTab();
      await addTabToStorage(await getActiveTab());
      injectScript(activeTab.id!);
    } else if (message === "deactivate_tab") {
      const activeTab = await getActiveTab();
      await removeTabFromStorage(activeTab.id!);

      if (__BROWSER__ === "firefox") {
        await browser.browserAction.setIcon({
          path: "../icon/128-off.png",
          tabId: activeTab.id,
        });
      } else {
        await browser.action.setIcon({
          path: "../icon/128-off.png",
          tabId: activeTab.id,
        });
      }
    } else if (message === "change") {
      const activeTabs = await getTabsFromStorage();
      activeTabs.forEach((tab) => {
        browser.tabs.reload(tab.id!);
      });
      // if (activeTab) browser.tabs.reload(activeTab.id!);
    }
  }
);
