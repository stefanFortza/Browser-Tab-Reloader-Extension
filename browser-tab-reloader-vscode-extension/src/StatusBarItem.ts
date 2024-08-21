import * as vscode from "vscode";
import { getPort, io } from "./Server";

export let statusBarItem: vscode.StatusBarItem;

export function createStatusBarItem() {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = "browser-tab-reloader-vscode-extension.toggleServer";
  updateStatusBarItemText();
  statusBarItem.tooltip = "Click to start / close reload server";
  statusBarItem.show();
}

export function updateStatusBarItemText() {
  if (io) {
    statusBarItem.text = `$(sync) ${getPort()}`;
  } else {
    statusBarItem.text = `$(sync-ignored) ${getPort()}`;
  }
}
