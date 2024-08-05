import * as vscode from "vscode";
import { io } from "./Server";

export let statusBarItem: vscode.StatusBarItem;

export function createStatusBarItem() {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = "browser-tab-reloader-vscode-extension.toggleServer";
  updateStatusBarItemText();
  statusBarItem.show();
}

export function updateStatusBarItemText() {
  if (io) {
    statusBarItem.text = "open:3000";
  } else {
    statusBarItem.text = "closed:3000";
  }
}
