import * as vscode from "vscode";
import * as path from "path";
import { createDecorator } from "./createDecorator";

export const showBookmark = (
    context: vscode.ExtensionContext,
    line: number,
    link: string
  ) => {
  const iconPath = vscode.Uri.file(
    path.join(context.extensionPath, "src", "spongebob.png")
  );

  createDecorator(context, iconPath, line, link);
};