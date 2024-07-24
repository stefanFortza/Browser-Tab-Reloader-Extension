import { FC, useEffect, useState } from "react";
import browser from "webextension-polyfill";
import "./Popup.css";
import {
  addTabToStorage,
  getActiveTab,
  getTabsFromStorage,
  removeTabFromStorage,
} from "../utils";

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
    browser.runtime.sendMessage("activate_tab");
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
