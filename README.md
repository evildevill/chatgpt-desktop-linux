# Chatgpt Desktop

Chatgpt Desktop is a cross-platform desktop application that allows you to use Notion directly on your computer, making it easier to chat with friends and family while working.

[![Get it from the Snap Store](https://snapcraft.io/en/dark/install.svg)](https://snapcraft.io/chatgpt-desktop-client)

![Image](https://raw.githubusercontent.com/xanmoy/chatgpt-desktop-client/refs/heads/main/screenshots/chatgpt.webp)

## 🛠 **Features**

ChatGPT Desktop is a lightweight, Electron-based application that brings the power of OpenAI's ChatGPT to your desktop. It provides a seamless and responsive interface for AI-driven conversations. Key features include:

1. **Anonymous Chatting**: Enjoy secure and private interactions without the need for an account.
2. **GPT-4 Mini**: Access the advanced capabilities of GPT-4 in a mini version, optimized for efficient performance.
3. **Secure**: All communications are encrypted, ensuring your data remains private and safe.
4. **Open Source**: The application is open-source, allowing users to contribute and modify the code for their needs.
5. **Cross-Platform**: Available on multiple platforms, ensuring smooth performance and a consistent experience.

Designed for both casual chats and productivity, ChatGPT Desktop offers an easy and secure way to interact with AI on your desktop.

![Image](https://github.com/xanmoy/chatgpt-desktop-client/blob/main/screenshots/image1.png)

## 📦 **Installation**

```bash
sudo snap install chatgpt-desktop-client --beta
```

### Build From Source

1. **Clone the repository**:

```bash
git clone https://github.com/xanmoy/chatgpt-desktop-client.git
cd chatgpt-desktop-client
```

2. **Install dependencies**: Ensure that you have all the necessary dependencies installed.

```bash
   npm instal
```

3. Start the application:

```bash
npm start
```

4. **Build the application**: Run the following command to create a Snap package of the application.

```bash
npm run dist
```

5. **Change to the dist directory**: Navigate to the dist directory where the Snap package is located.

```bash
cd dist
```

6. **Install the Snap package**: Use the following command to install the Snap package. The `--dangerous` flag allows the installation of locally built packages.

```bash
sudo snap install --dangerous ./chatgpt-desktop-client_1.0.0_amd64.snap 
```

## ↩️ **Uninstallation Steps**

Remove the Snap package: To uninstall the Chatgpt Desktop application, run the following command:

```bash
sudo snap remove chatgpt-desktop-client
```

## 📖 **Usage Instructions**

### **Launching the App**:

   After installation, open Chatgpt Desktop using:

```bash
   chatgpt-desktop-client
```

## 🤝 **Contributing**

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## 📜 **License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- **Electron** - Framework used to build the application.
