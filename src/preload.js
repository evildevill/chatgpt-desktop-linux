// Preload script for Electron app
// This runs in the renderer process before the web page loads

import { contextBridge } from 'electron';

// Expose APIs to the renderer if needed
// For now, no APIs exposed as the app loads external web content

// Example: contextBridge.exposeInMainWorld('electronAPI', {
//   // APIs here
// });
