import { FC, useEffect, useState } from "react";
import browser from "webextension-polyfill";
import "./Popup.css";
import {
  addTabToStorage,
  getActiveTab,
  getPortFromStorage,
  getTabsFromStorage,
  removeTabFromStorage,
  setPortInStorage,
} from "../utils";
import Toggle from "../components/Toggle";

const getIsCurrentTabActiveForReloading = async () => {
  const tabs = await getTabsFromStorage();
  const currentTab = await getActiveTab();
  return tabs.some((t) => t.id === currentTab.id);
};

const Popup: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [port, setPort] = useState(54999);

  useEffect(() => {
    const f = async () => {
      const isActiveForReloading = await getIsCurrentTabActiveForReloading();
      setIsActive(isActiveForReloading);
      const storagePort = await getPortFromStorage();
      setPort(storagePort);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const port = e.currentTarget.value;
    const portInt = parseInt(e.currentTarget.value);
    if (!port[port.length - 1].match(/^\d+$/) || portInt > 65535) {
      return;
    }
    setPort(portInt);
    setPortInStorage(portInt);
    getPortFromStorage();
    console.log(port);
  };

  return (
    <div id="container">
      <Toggle
        isActive={isActive}
        onActivate={handleActivate}
        onDeactivate={handleDeactivate}
        setIsActive={setIsActive}
      />

      <section>
        <label htmlFor="port">Port(default: 54999, max 65535): </label>

        <input
          id="port"
          name="port"
          type="text"
          onChange={handleInputChange}
          value={port}
        />
      </section>
    </div>
  );
};

export default Popup;
