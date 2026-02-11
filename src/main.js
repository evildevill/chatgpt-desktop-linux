import { app, BrowserWindow, shell } from 'electron';
import path from 'path';
import { config } from './config/index.js';
import { fileURLToPath } from 'url';
import electronContextMenu from 'electron-context-menu';

// Constants
const APP_URL = 'https://chatgpt.com';
const ICON_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'assets/icon.png'
);

// Set up the context menu
electronContextMenu({
  showSaveImageAs: true,
});

let mainWindow = null;

/**
 * Handles new window creation, specifically for Google Sign-In popups.
 * @param {Object} details - Details about the new window.
 * @returns {Object} Action to take.
 */
function handleNewWindow(details) {
  if (details.url.includes('accounts.google.com')) {
    shell.openExternal(details.url);
    return { action: 'deny' };
  }
  return { action: 'allow' };
}

/**
 * Creates the main application window.
 */
function createMainWindow() {
  mainWindow = new BrowserWindow({
    icon: ICON_PATH,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nativeWindowOpen: true,
      preload: path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        'preload.js'
      ),
      webSecurity: true,
    },
  });

  mainWindow.loadURL(APP_URL, {
    userAgent: config.userAgent,
  });

  mainWindow.webContents.setWindowOpenHandler(handleNewWindow);

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
  });
}

/**
 * Processes command line arguments to extract a valid URL.
 * @param {Array<string>} args - Command line arguments.
 * @returns {string|null} The extracted URL or null.
 */
function processCommandLineArgs(args) {
  const httpsRegex = /^https:\/\/www\.chatgpt\.com\/.*/;
  const chatgptRegex = /^chatgpt:\/\//;

  for (const arg of args) {
    if (httpsRegex.test(arg)) {
      return arg;
    }
    if (chatgptRegex.test(arg)) {
      return APP_URL + arg.substring(11);
    }
  }
  return null;
}

/**
 * Handles second instance events.
 * @param {Event} event - The event.
 * @param {Array<string>} args - Command line arguments.
 */
function handleSecondInstance(event, args) {
  if (mainWindow) {
    const url = processCommandLineArgs(args);
    if (url) {
      mainWindow.loadURL(url, { userAgent: config.userAgent });
    }
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
}

/**
 * Initializes the application.
 */
async function initializeApp() {
  // Set the app name
  app.setName('ChatGPT');

  // Request single instance lock
  const gotLock = app.requestSingleInstanceLock();
  if (!gotLock) {
    app.quit();
    return;
  }

  // Wait for app to be ready
  await app.whenReady();

  // Create the main window
  createMainWindow();

  // Handle second instance
  app.on('second-instance', handleSecondInstance);

  // Handle window all closed
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // Handle activate (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
}

// Start the application
initializeApp().catch(console.error);
