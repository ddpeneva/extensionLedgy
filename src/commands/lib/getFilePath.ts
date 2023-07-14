import * as vscode from "vscode";

export const getFilePath = (editor: vscode.TextEditor) => {
  return editor.document.fileName;
};
