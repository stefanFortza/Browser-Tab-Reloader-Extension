import * as vscode from "vscode";
import { io } from "./Server";

export async function onFileChange(e: vscode.Uri) {
  console.log(e.fsPath);

  if (!isFileWatched(e)) {
    return;
  }

  console.log("Document changed.");
  const delay = getDelay();

  setTimeout(() => {
    if (io && delay) {
      io.emit("change");
    }
  }, delay);
}

function getFileExtensionsToWatch(): string[] {
  const extensions = vscode.workspace
    .getConfiguration("browser-tab-reloader-vscode-extension")
    .get<string>("fileExtensions");

  if (!extensions) {
    return [];
  }
  const extensionsArray = extensions.split(",").map((t) => t.trim());
  console.log(extensionsArray);
  return extensionsArray;
}

function extractExtension(fileName: string) {
  const arr = fileName.split(".");
  return arr[arr.length - 1].trim();
}
function getDelay(): number {
  return (
    vscode.workspace
      .getConfiguration("browser-tab-reloader-vscode-extension")
      .get<number>("reloadDelay") || 50
  );
}
function isFileWatched(file: vscode.Uri): boolean {
  const fileExtensionsToWatch = getFileExtensionsToWatch();
  if (fileExtensionsToWatch.length === 0) {
    return true;
  }
  const currentFileExtension = extractExtension(file.fsPath);
  console.log(currentFileExtension);

  return fileExtensionsToWatch.indexOf(currentFileExtension) !== -1
    ? true
    : false;
}
