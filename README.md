# Chatgpt Desktop

Chatgpt Desktop is a cross-platform desktop application that allows you to use ChatGPT directly on your computer, making it easier to chat with AI while working.

[![Get it from the Snap Store](https://snapcraft.io/en/dark/install.svg)](https://snapcraft.io/chatgpt-desktop-linux)

![Image](https://raw.githubusercontent.com/evildevill/chatgpt-desktop-linux/refs/heads/main/screenshots/chatgpt.webp)

## 🛠 **Features**

ChatGPT Desktop is a lightweight, Electron-based application that brings the power of OpenAI's ChatGPT to your desktop. It provides a seamless and responsive interface for AI-driven conversations. Key features include:

1. **Anonymous Chatting**: Enjoy secure and private interactions without the need for an account.
2. **Secure**: All communications are encrypted, ensuring your data remains private and safe.
3. **Open Source**: The application is open-source, allowing users to contribute and modify the code for their needs.
4. **Cross-Platform**: Available on multiple platforms, ensuring smooth performance and a consistent experience.
5. **GPT-5 Mini**: Access the advanced capabilities of GPT-5 in a mini version, optimized for efficient performance.

Designed for both casual chats and productivity, ChatGPT Desktop offers an easy and secure way to interact with AI on your desktop.

## 📦 **Installation**

```bash
sudo snap install chatgpt-desktop-linux
```

### Build From Source

1. **Clone the repository**:

```bash
git clone https://github.com/evildevill/chatgpt-desktop-linux.git
cd chatgpt-desktop-linux
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the application**:

```bash
npm start
```

4. **Build the snap**:

```bash
npm run dist:snap
```

5. **Install the built snap**:

```bash
sudo snap install --dangerous ./dist/chatgpt-desktop-linux_*.snap
```

## ↩️ **Uninstallation**

```bash
sudo snap remove chatgpt-desktop-linux
```

## 📖 **Usage**

```bash
chatgpt-desktop-linux
```

## 🤝 **Contributing**

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## 📜 **License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- **Electron** - Framework used to build the application.
