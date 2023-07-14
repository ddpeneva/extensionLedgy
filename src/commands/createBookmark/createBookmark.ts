import * as vscode from 'vscode';
import axios from 'axios';
import { getFilePath } from '../lib/getFilePath';

function getFileInfo(editor: vscode.TextEditor) {
  const position = editor.selection.active;
  const lineNumber = position.line + 1;
  return {
    file: getFilePath(editor),
    line: lineNumber,
  };
}

async function submitBookmark(bookmark: Bookmark) {
  const response = await axios.post('https://polite-gaufre-824dca.netlify.app/.netlify/functions/links', bookmark);
  console.log(response);
  return response;
}

export const showInputBox = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return vscode.window.showErrorMessage('No active text editor found!');
  }
  const textInput = await vscode.window.showInputBox({
		placeHolder: "Which Notion page are you looking for?",
	});
  console.log(textInput);

  // Prepare new bookmark data
  const newBookmarkData: Bookmark = {
    ...getFileInfo(editor),
    link: textInput ?? '',
  };
  console.log(newBookmarkData);

  // Send new bookmark to API
  await submitBookmark(newBookmarkData);
  vscode.window.showInformationMessage('Code linked with docs!');
};
