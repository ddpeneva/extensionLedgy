import * as vscode from "vscode";

const choices = ["a", "b"];

export async function getUserSelectdValue() {
  return new Promise((resolve) => {
    const quickPick = vscode.window.createQuickPick();
    quickPick.items = choices.map((choice) => ({ label: choice }));

    quickPick.title = "Choose your favorite value:";

    quickPick.onDidChangeValue(() => {
      // INJECT user values into proposed values
      if (!choices.includes(quickPick.value)) {
        quickPick.items = [quickPick.value, ...choices].map((label) => ({
          label,
        }));
      }
    });

    quickPick.onDidAccept(() => {
      const selection = quickPick.activeItems[0];
      resolve(selection.label);
      quickPick.hide();
    });
    quickPick.show();
  });
}
