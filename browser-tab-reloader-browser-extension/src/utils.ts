import browser from "webextension-polyfill";
export type Tab = browser.Tabs.Tab;

export const getTabsFromStorage = async (): Promise<Tab[]> => {
  const item = await browser.storage.session.get("tabs");
  return item.tabs ? item.tabs : [];
};

export const setTabsInStorage = async (tabs: Tab[]) => {
  await browser.storage.session.set({ tabs: tabs });
};

export const addTabToStorage = async (tab: Tab) => {
  const tabs = await getTabsFromStorage();
  if (tabs.some((t) => t.id === tab.id)) return;
  setTabsInStorage([...tabs, tab]);
};

export const getActiveTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await browser.tabs.query(queryOptions);
  return tab;
};

export async function removeTabFromStorage(id: number): Promise<void>;
export async function removeTabFromStorage(tab: Tab): Promise<void>;
export async function removeTabFromStorage(tab: Tab | number): Promise<void> {
  const tabs = await getTabsFromStorage();
  const newTabs = tabs.filter(
    (t) => t.id != (typeof tab === "number" ? tab : tab.id)
  );
  await setTabsInStorage(newTabs);
}

export async function getPortFromStorage(): Promise<number> {
  const item = await browser.storage.local.get("port");
  console.log(item.port);
  if (!item.port) {
    setPortInStorage(54999);
  }
  return item.port;
}

export async function setPortInStorage(port: number): Promise<void> {
  browser.storage.local.set({ port });
}
