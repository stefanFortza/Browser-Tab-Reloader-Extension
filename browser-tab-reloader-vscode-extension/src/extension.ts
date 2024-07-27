import * as vscode from "vscode";
import http from "http";
import { Server } from "socket.io";

let io: Server | undefined;

vscode.workspace.onDidSaveTextDocument(async (e: vscode.TextDocument) => {
  console.log("Document changed.");
  const delay: number | undefined = vscode.workspace
    .getConfiguration("browser-tab-reloader-vscode-extension")
    .get("reloadDelay");
  console.log(delay);

  setTimeout(() => {
    if (io && delay) {
      io.emit("change", e.getText());
    }
  }, delay);
});

export function activate(context: vscode.ExtensionContext) {
  const startServer = () => {
    const httpServer = http.createServer();
    io = new Server(httpServer, {
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

    httpServer.listen(3000, () => {
      console.log("Server started on port 3000");
      vscode.window.showInformationMessage("Server started on port 3000");
    });
  };

  console.log(
    'Congratulations, your extension "browser-tab-reloader-vscode-extension" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "browser-tab-reloader-vscode-extension.startServer",
    () => {
      if (!io) {
        startServer();
      } else {
        vscode.window.showInformationMessage("Server is already running.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  if (io) {
    io.close(() => {
      console.log("Server closed");
    });
  }
}
