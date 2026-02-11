# Snapcraft Store Listing for ChatGPT Desktop

## Basic Information
- **Name**: `chatgpt-desktop`
- **Title**: ChatGPT Desktop
- **Version**: 1.0.1
- **Summary**: Unofficial ChatGPT Desktop Client
- **Description**:
  ```
  A simple and efficient desktop client for ChatGPT, using Electron to provide a seamless experience.

  ChatGPT Desktop is a lightweight, Electron-based application that brings the power of OpenAI's ChatGPT to your desktop. It provides a seamless and responsive interface for AI-driven conversations. Key features include:

  - Anonymous Chatting: Enjoy secure and private interactions without the need for an account.
  - GPT-4 Mini: Access the advanced capabilities of GPT-4 in a mini version, optimized for efficient performance.
  - Secure: All communications are encrypted, ensuring your data remains private and safe.
  - Open Source: The application is open-source, allowing users to contribute and modify the code for their needs.
  - Cross-Platform: Available on multiple platforms, ensuring smooth performance and a consistent experience.

  Designed for both casual chats and productivity, ChatGPT Desktop offers an easy and secure way to interact with AI on your desktop.
  ```
- **License**: ISC
- **Website**: https://github.com/evildevill/chatgpt-desktop-linux
- **Source Code**: https://github.com/evildevill/chatgpt-desktop-linux
- **Issues**: https://github.com/evildevill/chatgpt-desktop-linux/issues
- **Contact**: evildevill
- **Developer**: evildevill
- **Publisher**: evildevill

## Categories
- Utility
- Productivity
- Education

## Keywords
- electron
- chatgpt
- desktop
- linux
- ai
- gpt

## Screenshots
- ![Screenshot 1](https://raw.githubusercontent.com/evildevill/chatgpt-desktop-linux/main/screenshots/chatgpt.webp)
- ![Screenshot 2](https://raw.githubusercontent.com/evildevill/chatgpt-desktop-linux/main/screenshots/image1.png)

## Icon
- Path: `assets/icon.png`
- URL: https://raw.githubusercontent.com/evildevill/chatgpt-desktop-linux/main/assets/icon.png

## Featured Banner
- Path: `assets/banner.png`
- URL: https://raw.githubusercontent.com/evildevill/chatgpt-desktop-linux/main/assets/banner.png
- Size: 1080x240 pixels

## Installation Instructions
```bash
sudo snap install chatgpt-desktop --beta
```

## Usage
After installation, launch the app with:
```bash
chatgpt-desktop
```

## Build and Development
1. Clone the repository:
   ```bash
   git clone https://github.com/evildevill/chatgpt-desktop-linux.git
   cd chatgpt-desktop-linux
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Build the Snap:
   ```bash
   npm run dist
   ```

## Changelog
- **v1.0.1**: Initial release with system tray support and basic features.

## Permissions (Plugs)
- network
- network-bind
- desktop
- desktop-legacy
- wayland
- x11
- opengl

## Confinement
- Strict

## Base
- core24

## Grade
- Stable

## Release Channels
- Stable: Latest stable release
- Beta: Pre-release versions
- Edge: Development builds

## Acknowledgments
- Electron framework
- OpenAI ChatGPT</content>
<parameter name="filePath">/home/hacker/chatgpt-desktop-linux/snapcraft-store.md