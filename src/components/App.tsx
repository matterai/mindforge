import React, { useEffect, useState } from "react";

// Define the window interface to include Electron API
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
  const [version, setVersion] = useState<string>("");
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hello World</h1>
        <p className="text-lg text-gray-600 mb-2">Welcome to MindForge</p>
        {isElectron && version && (
          <p className="text-sm text-gray-500">
            Running on Electron v{version}
          </p>
        )}
        {!isElectron && (
          <p className="text-sm text-gray-500">Running in browser mode</p>
        )}
      </div>
    </div>
  );
};

export default App;
