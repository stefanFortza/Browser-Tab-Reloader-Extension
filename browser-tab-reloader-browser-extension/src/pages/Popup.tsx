import { FC, useEffect, useState } from "react";
import browser from "webextension-polyfill";
import "./Popup.css";

type Tab = browser.Tabs.Tab;

const getTabsFromStorage = async (): Promise<Tab[]> => {
  const item = await browser.storage.session.get("tabs");
  return item.tabs ? item.tabs : [];
};

const setTabsInStorage = async (tabs: Tab[]) => {
  await browser.storage.session.set({ tabs: tabs });
};

const addTabToStorage = async (tab: Tab) => {
  const tabs = await getTabsFromStorage();
  if (tabs.some((t) => t.id === tab.id)) return;
  setTabsInStorage([...tabs, tab]);
};

const getActiveTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await browser.tabs.query(queryOptions);
  return tab;
};

const removeTabFromStorage = async (tab: Tab) => {
  const tabs = await getTabsFromStorage();
  const newTabs = tabs.filter((t) => t.id != tab.id);
  await setTabsInStorage(newTabs);
};

const getIsCurrentTabActiveForReloading = async () => {
  const tabs = await getTabsFromStorage();
  const currentTab = await getActiveTab();
  return tabs.some((t) => t.id === currentTab.id);
};

const Popup: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
      const isActiveForReloading = await getIsCurrentTabActiveForReloading();
      setIsActive(isActiveForReloading);
    };
    f();
  }, []);

  const handleActivate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("Activated Extension On This Page");
    await addTabToStorage(await getActiveTab());
    console.log(await getTabsFromStorage());
    setIsActive(true);
  };

  const handleDeactivate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("Activated Extension On This Page");
    await removeTabFromStorage(await getActiveTab());
    console.log(await getTabsFromStorage());
    setIsActive(false);
  };

  return (
    <div>
      {!isActive ? (
        <button style={{ backgroundColor: "green" }} onClick={handleActivate}>
          Activate
        </button>
      ) : (
        <button style={{ backgroundColor: "red" }} onClick={handleDeactivate}>
          Deactivate
        </button>
      )}
    </div>
  );
};

export default Popup;
