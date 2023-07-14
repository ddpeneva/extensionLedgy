// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { showBookmarks } from "./commands/showBookmarks/showBookmarks";
import { showInputBox } from "./commands/createBookmark/createBookmark";
import { getUserSelectdValue } from "./commands/createBookmark/getUserSelectedValue";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  showBookmarks(context);
  const disposable = vscode.commands.registerCommand(
    "helloworld.createBookmark",
    () => {
      getUserSelectdValue(context);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
