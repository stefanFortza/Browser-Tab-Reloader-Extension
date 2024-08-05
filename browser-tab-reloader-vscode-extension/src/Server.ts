import * as vscode from "vscode";
import { Server } from "socket.io";
import { updateStatusBarItemText } from "./StatusBarItem";

export let io: Server | null = null;

export function startServer() {
  if (io) {
    vscode.window.showInformationMessage("Server is already running.");
    return io;
  }

  io = new Server({
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("ping", () => {
      console.log("pong");
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected.");
    });
  });

  io.listen(3000);

  console.log("Server started on port 3000");
  vscode.window.showInformationMessage(
    "Browser Tab Reloader: Server started on port 3000"
  );
}

export function stopServer() {
  if (!io) {
    vscode.window.showInformationMessage("Browser Tab Reloader: Server closed");
    return;
  }
  io.close((e) => {
    vscode.window.showInformationMessage("Browser Tab Reloader: Server closed");
    console.log("Server closed");
  });
  io = null;
}

export async function toggleServer() {
  if (!io) {
    await vscode.commands.executeCommand(
      "browser-tab-reloader-vscode-extension.startServer"
    );
  } else {
    vscode.commands.executeCommand(
      "browser-tab-reloader-vscode-extension.stopServer"
    );
  }
  updateStatusBarItemText();
}
