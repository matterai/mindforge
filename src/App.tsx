import React, { useEffect, useState } from "react";
import { Editor } from "./editor";

declare global {
  interface Window {
    electron?: {
      app: {
        getVersion: () => Promise<string>;
      };
    };
  }
}

const App: React.FC = () => {
  const [, setVersion] = useState<string>("");
  const isElectron = window.electron !== undefined;

  useEffect(() => {
    const getAppVersion = async () => {
      if (window.electron) {
        try {
          const ver = await window.electron.app.getVersion();
          setVersion(ver);
        } catch (error) {
          console.error("Failed to get app version", error);
        }
      }
    };

    if (isElectron) {
      getAppVersion();
    }
  }, [isElectron]);

  return (
    <div className="flex items-center justify-center">
      <Editor />
    </div>
  );
};

export default App;
