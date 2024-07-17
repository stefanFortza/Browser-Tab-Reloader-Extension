// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import http from "http";
import { Server } from "socket.io";
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["chrome-extension://oaebgohlagpedmgekbdmbkfkkfilhmkj", "*"],
    allowedHeaders: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connection");

  socket.on("ping", (socket) => {
    console.log("pong");
  });
});

vscode.workspace.onDidSaveTextDocument((e: vscode.TextDocument) => {
  console.log("Document changed.");
  io.emit("change");
  console.log(e.getText());
});

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "browser-tab-reloader-vscode-extension" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "browser-tab-reloader-vscode-extension.startServer",
    () => {
      vscode.window.showInformationMessage("Server started on port 3000");
    }
  );

  context.subscriptions.push(disposable);

  io.listen(3000);
}

export function deactivate() {}
