import * as vscode from "vscode";
import { io, startServer, stopServer, toggleServer } from "./Server";
import { onFileChange } from "./OnFileChange";
import { createStatusBarItem, statusBarItem } from "./StatusBarItem";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "browser-tab-reloader-vscode-extension" is now active!'
  );

  if (!io) {
    startServer();
  } else {
    vscode.window.showInformationMessage("Server is already running.");
  }

  // Commands

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "browser-tab-reloader-vscode-extension.startServer",
      startServer
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "browser-tab-reloader-vscode-extension.stopServer",
      stopServer
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "browser-tab-reloader-vscode-extension.toggleServer",
      toggleServer
    )
  );

  // Wathcher

  const watcher = vscode.workspace.createFileSystemWatcher("**/*");
  watcher.onDidChange(onFileChange);
  watcher.onDidCreate(onFileChange);
  watcher.onDidDelete(onFileChange);

  // Status Bar Item

  createStatusBarItem();
  context.subscriptions.push(statusBarItem);
  statusBarItem.show();
}

export function deactivate() {
  vscode.commands.executeCommand(
    "browser-tab-reloader-vscode-extension.stopServer"
  );
}
