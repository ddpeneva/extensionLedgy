import * as path from "path";
import * as vscode from "vscode";

export const getFilePath = (editor: vscode.TextEditor) => {
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
  if (workspaceFolder) {
    const relativePath = path.relative(workspaceFolder.uri.fsPath, editor.document.uri.fsPath);
    return relativePath;
  }

  vscode.window.showErrorMessage('No workspace folder found :(');
  return '';
};
