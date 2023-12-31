import * as vscode from "vscode";
import { PageQuickPick, setNotionSuggestions } from "./lib/setNotionSuggestions";
import { getFileInfo } from "./lib/getFileInfo";
import { submitBookmark } from "./lib/submitBookmark";
import { showBookmark } from "../lib/showBookmark";

const DEFAULT_SEARCH = 'ifrs';

const saveBookmark = async (editor: vscode.TextEditor, link = '') => {
  // Prepare new bookmark data
  const newBookmarkData: Bookmark = {
    ...getFileInfo(editor),
    link: link,
  };
  console.log(newBookmarkData);

  // Send new bookmark to API
  await submitBookmark(newBookmarkData);
  return newBookmarkData;
};

export async function getUserSelectdValue(context: vscode.ExtensionContext) {
  return new Promise(async (resolve) => {
    const quickPick: PageQuickPick = vscode.window.createQuickPick();
    quickPick.title = "Search for your notion page (or paste any URL)";
    setNotionSuggestions(quickPick, DEFAULT_SEARCH);

    // On change event listener
    quickPick.onDidChangeValue(() => {
      setNotionSuggestions(quickPick, quickPick.value || DEFAULT_SEARCH);
    });

    // On select event listener
    quickPick.onDidAccept(async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return vscode.window.showErrorMessage('No active text editor found!');
      }
      
      const selection = quickPick.activeItems[0];
      const newBookmark = await saveBookmark(editor, selection.page.url);
      showBookmark(context, newBookmark.line, newBookmark.link);
      quickPick.hide();
      vscode.window.showInformationMessage('Code linked with docs!');
    });

    quickPick.show();
  });
}
