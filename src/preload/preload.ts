import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electron", {
  app: {
    getVersion: () => ipcRenderer.invoke("app:get-version"),
  },
});
