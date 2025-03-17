import { app, BrowserWindow, shell, ipcMain } from "electron";
import path from "path";
import url from "url";
import { fileURLToPath } from "url";
import isDev from "electron-is-dev";
import dotenv from "dotenv";
// Temporarily disable electron-updater to fix dependency issues
// import electronUpdater from "electron-updater";
// const { autoUpdater } = electronUpdater;

// Load environment variables
dotenv.config();
const APP_PORT = process.env.APP_PORT || "5000";

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle creating/removing shortcuts on Windows when installing/uninstalling
// Dynamic import for CommonJS module in ESM context
let isSquirrelStartup = false;
try {
  // For ESM, we need to use dynamic import and access the default property
  const electronSquirrelStartup = await import("electron-squirrel-startup");
  isSquirrelStartup = electronSquirrelStartup.default;
} catch (e) {
  console.error("Failed to import electron-squirrel-startup:", e);
}

if (isSquirrelStartup) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "../preload/preload.js"),
    },
  });

  // Load the app
  const appURL = isDev
    ? `http://localhost:${APP_PORT}` // Vite dev server URL with environment variable
    : url.format({
        pathname: path.join(app.getAppPath(), "dist/renderer/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(appURL);

  // Show window when ready
  mainWindow.once("ready-to-show", () => {
    if (mainWindow) {
      mainWindow.show();

      if (isDev) {
        mainWindow.webContents.openDevTools();
      }
    }
  });

  // Open links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
};

// Create window when Electron is ready
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Check for updates - temporarily disabled
  // if (!isDev) {
  //   autoUpdater.checkForUpdatesAndNotify();
  // }
});

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Handle IPC Messages from renderer
ipcMain.handle("app:get-version", () => {
  return app.getVersion();
});
