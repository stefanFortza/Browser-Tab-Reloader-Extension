import { FC, useEffect, useState } from "react";
import browser from "webextension-polyfill";
import "./Options.css";
import { getPortFromStorage, setPortInStorage } from "../utils";

const Options: FC = () => {
  const [port, setPort] = useState(54999);
  useEffect(() => {
    async function f() {
      const storagePort = await getPortFromStorage();
      setPort(storagePort);
    }
    f();
  }, []);

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
    <div>
      <h1 style={{ textAlign: "center" }}>Options</h1>
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

export default Options;
