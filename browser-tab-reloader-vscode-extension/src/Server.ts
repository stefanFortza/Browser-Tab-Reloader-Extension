import net from "net";
import * as vscode from "vscode";
import { Server } from "socket.io";
import { updateStatusBarItemText } from "./StatusBarItem";

export let io: Server | null = null;

export async function startServer() {
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

  const res = await findNextFreePort();

  console.log(res);
  try {
    io.listen(res.port);
  } catch (error) {}

  if (res.wasPortChanged) {
    vscode.window.showWarningMessage(
      `Browser Tab Reloader: default port: ${res.defaultPort} is already being used, port: ${res.port} is used instead.`
    );
  } else {
    vscode.window.showInformationMessage(
      `Browser Tab Reloader: Server started on port ${getPort()}`
    );
  }
  console.log(`Server started on port ${getPort()}`);

  updateStatusBarItemText();
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
  updateStatusBarItemText();
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

export function getPort(): number {
  return (
    vscode.workspace
      .getConfiguration("browser-tab-reloader-vscode-extension")
      .get<number>("port") || 54999
  );
}

export async function findNextFreePort(): Promise<{
  port: number;
  defaultPort: number;
  wasPortChanged: boolean;
}> {
  const defaultPort = getPort();
  let port = defaultPort;
  while (port <= 64000) {
    if (await checkPort(port)) {
      await setPort(port);
      break;
    } else {
      port++;
    }
  }
  return { port, defaultPort, wasPortChanged: defaultPort !== port };
}

export async function setPort(port: number): Promise<void> {
  await vscode.workspace
    .getConfiguration("browser-tab-reloader-vscode-extension")
    .update("port", port);
}

function checkPort(port: number, host = "127.0.0.1") {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", (err: Error & { code: string }) => {
      if (err.code === "EADDRINUSE") {
        resolve(false); // Port is in use
      } else {
        reject(err);
      }
    });

    server.once("listening", () => {
      server.close(() => {
        resolve(true); // Port is free
      });
    });

    server.listen(port, host);
  });
}
