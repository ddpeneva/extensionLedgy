import * as vscode from "vscode";
import * as path from "path";
import axios from 'axios';
import { createDecorator } from "./lib/createDecorator";
import { getFilePath } from "../lib/getFilePath";

const fake_bookmarks = [
  { line: 3, link: "https://google.com" },
  { line: 7, link: "https://example.com" },
  { line: 15, link: "https://notion.com" },
];

const getFileBookmarks = async (path: string): Promise<Bookmark[]> => {
  const { data } = await axios.get(`https://polite-gaufre-824dca.netlify.app/.netlify/functions/links?path=${path}`);
  return data.links;
}; 

export const showBookmarks = async (context: vscode.ExtensionContext) => {
  const editor = vscode.window.activeTextEditor;
  const filePath = editor && getFilePath(editor);

  console.log('####');
  console.log(filePath);
  console.log('####');

  const bookmarks = await getFileBookmarks(filePath ?? '');
  // const bookmarks = fake_bookmarks;
  console.log(bookmarks);

  const iconPath = vscode.Uri.file(
    path.join(context.extensionPath, "src", "spongebob.png")
  );

  bookmarks.forEach(({ line, link }) => {
    createDecorator(context, iconPath, line, link);
  });
};
