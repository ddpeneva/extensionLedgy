import * as vscode from "vscode";
import * as path from "path";
import { createDecorator } from "./lib/createDecorator";

const bookmarks = [
  { line: 3, link: "https://google.com" },
  { line: 7, link: "https://example.com" },
  { line: 15, link: "https://notion.com" },
];

export const showBookmarks = (context: vscode.ExtensionContext) => {
  const iconPath = vscode.Uri.file(
    path.join(context.extensionPath, "src", "spongebob.png")
  );

  bookmarks.forEach((i) => {
    createDecorator(context, iconPath, i.line, i.link);
  });
  // Register a decoration type
};
