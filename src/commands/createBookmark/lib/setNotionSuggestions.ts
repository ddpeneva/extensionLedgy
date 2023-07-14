import * as vscode from "vscode";
import { getNotionSuggestions } from "./getNotionSuggestions";
import { getPageNameAndIcon } from "./getPageNameAndIcon";

interface NotionPageQuickPickItem extends vscode.QuickPickItem {
  page: NotionPage;
};
export type PageQuickPick = vscode.QuickPick<NotionPageQuickPickItem>;

export const setNotionSuggestions = async (quickPick: PageQuickPick, query = '') => {
  const items: NotionPage[] = await getNotionSuggestions(query);
  quickPick.items = items.map((page) => ({ 
    page,
    label: getPageNameAndIcon(page),
  }));
};
