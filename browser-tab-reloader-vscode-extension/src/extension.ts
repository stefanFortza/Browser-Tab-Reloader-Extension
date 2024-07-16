// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Server } from "socket.io";
const io = new Server();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

io.on("connection", () => {
  console.log("connection");
});

vscode.workspace.onDidSaveTextDocument((e: vscode.TextDocument) => {
  console.log("Document changed.");
  io.emit("change");
  console.log(e.getText());
});

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "browser-tab-reloader-vscode-extension" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "browser-tab-reloader-vscode-extension.startServer",
    () => {
      vscode.window.showInformationMessage("Server started on port 3000");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

io.listen(3000);
