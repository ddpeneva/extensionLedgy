import * as vscode from 'vscode';
import { submitBookmark } from './lib/submitBookmark';

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
function getFileInfo(editor: vscode.TextEditor): Bookmark {
  throw new Error('Function not implemented.');
}

