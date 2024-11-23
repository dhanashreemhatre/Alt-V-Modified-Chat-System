# Alt:V Chat System

This **Alt:V Chat System** is a custom in-game chat implementation designed for the Alt:V multiplayer platform. It provides a clean, responsive interface for players to communicate in real-time. The system supports core chat features like message rendering, command parsing, and seamless server-client synchronization.

---

## Features

### 1. **Real-Time Chat**
- Players can send and receive messages in real-time.
- Distinguishes between global, team, and private chat channels.

### 2. **Command Parsing**
- Supports custom chat commands (e.g., `/help`, `/me`, `/whisper`).
- Extendable command system for server-side interactions.

### 3. **Customizable UI**
- Modern, minimalist design for a seamless in-game experience.
- Adjustable styles for themes, colors, and fonts.

### 4. **Server-Client Synchronization**
- Server-to-client and client-to-server communication.
- Ensure messages are relayed and stored correctly.

### 5. **Message History**
- Scrollable chat window to view past messages.
- Optional persistence for session-based message storage.

### 6. **Notifications and Alerts**
- Display system notifications or admin messages in a different style.
- Highlight specific users or messages using tags or mentions.

---

## File Structure

### Client-Side

- **chat.js**: Handles client-side chat rendering and interactions.
- **styles.css**: Styling for the chat UI.
- **commands.js**: Defines client-side commands and their behaviors.

### Server-Side

- **server.js**: Core logic for chat handling and command processing.
- **commands.js**: Server-side definitions for command handlers.
- **events.js**: Custom Alt:V event listeners for message transmission.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Alt:V Server** (latest version)
- A code editor like **VS Code**

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project folder:
   ```bash
   cd altv-chat-system
   ```

3. Copy the files to your Alt:V resource directory:
   ```bash
   cp -r ./chat-system /path/to/altv-resources
   ```

4. Add the resource to your `server.cfg`:
   ```ini
   resources: [ ..., "chat-system" ]
   ```

---

## Usage

### Commands
Commands are parsed with a leading `/`. For example:
- `/help` – Displays available commands.
- `/me <action>` – Roleplay an action.
- `/whisper <player> <message>` – Send a private message to a player.

### Chat Channels
- **Global Chat**: Default channel for all players.
- **Team Chat**: Restricted to specific teams or groups.
- **Private Messages**: Player-to-player communication.

### Message Types
- **Player Messages**: Regular player communications.
- **Admin Messages**: Highlighted and styled for visibility.
- **System Notifications**: Alerts or announcements from the server.

---

## Customization

### UI Styling
Modify the `styles.css` file to:
- Change colors and fonts.
- Adjust the position and size of the chat window.

### Command Extensions
Add new commands in the `commands.js` file:
```javascript
alt.on('chatCommand', (command, args) => {
  if (command === 'greet') {
    alt.emitServer('chat:sendMessage', `Hello, ${args[0]}!`);
  }
});
```

### Server Logic
Extend the server-side `commands.js` to define server-specific behaviors:
```javascript
alt.on('playerCommand', (player, command, args) => {
  if (command === 'kick') {
    let target = getPlayerByName(args[0]);
    if (target) target.kick('You have been kicked!');
  }
});
```

---

## Technologies Used

- **Alt:V Multiplayer Framework**: Provides the backend and client API.
- **JavaScript**: Core language for client and server logic.
- **CSS**: For chat UI styling.

---

## Future Enhancements

- Add **chat filtering** for inappropriate words.
- Implement **group chat functionality**.
- Provide **logging and auditing** for chat messages.
- Support **persistent chat history** stored in a database.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contributions
Feel free to fork the repository, create pull requests, or suggest features via issues.

---

### Contact
For support or further questions, reach out to the repository maintainer.
