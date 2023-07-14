import * as vscode from 'vscode';
import { getFilePath } from '../../lib/getFilePath';

export const getFileInfo = (editor: vscode.TextEditor) => {
  const position = editor.selection.active;
  const lineNumber = position.line + 1;
  return {
    file: getFilePath(editor),
    line: lineNumber,
  };
};