import { FC, useEffect, useState } from "react";
import browser from "webextension-polyfill";
import "./Popup.css";
import {
  addTabToStorage,
  getActiveTab,
  getTabsFromStorage,
  removeTabFromStorage,
} from "../utils";
import Toggle from "../components/Toggle";

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

  const handleActivate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Activated Extension On This Page");
    // await addTabToStorage(await getActiveTab());
    console.log(await getTabsFromStorage());
    browser.runtime.sendMessage("activate_tab");
    setIsActive(true);
  };

  const handleDeactivate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Activated Extension On This Page");
    // await removeTabFromStorage(await getActiveTab());
    browser.runtime.sendMessage("deactivate_tab");
    console.log(await getTabsFromStorage());
    setIsActive(false);
  };

  return (
    <div id="container">
      <Toggle
        isActive={isActive}
        onActivate={handleActivate}
        onDeactivate={handleDeactivate}
        setIsActive={setIsActive}
      />
    </div>
  );
};

export default Popup;
