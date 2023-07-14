import * as vscode from "vscode";
import axios from 'axios';
import { getFilePath } from "../lib/getFilePath";
import { showBookmark } from "../lib/showBookmark";

const getFileBookmarks = async (path: string): Promise<Bookmark[]> => {
  const { data } = await axios.get(`https://polite-gaufre-824dca.netlify.app/.netlify/functions/links?path=${path}`);
  return data.links;
}; 

export const showBookmarks = async (context: vscode.ExtensionContext) => {
  const editor = vscode.window.activeTextEditor;
  const filePath = editor && getFilePath(editor);
  console.log(filePath);

  const bookmarks = await getFileBookmarks(filePath ?? '');

  bookmarks.forEach(({ line, link }) => {
    showBookmark(context, line, link);
  });
};
