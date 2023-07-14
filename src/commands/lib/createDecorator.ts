import * as vscode from "vscode";

export const createDecorator = (
  context: vscode.ExtensionContext,
  iconPath: string | vscode.Uri,
  lineNumber: number,
  link: string
) => {
  const decorationType = vscode.window.createTextEditorDecorationType({
    gutterIconPath: iconPath,
    gutterIconSize: "contain",
    overviewRulerLane: vscode.OverviewRulerLane.Right,
  });

  // Create a decoration range at the specified line number
  // Using lineNumber - 1 because vscode counts lines starting on 0
  const decorationRange = new vscode.Range(
    lineNumber - 1, 
    0, // start column
    lineNumber - 1,
    0 // end column
  );

  // Create a decoration instance using the decoration type and range
  const decoration = { range: decorationRange };

  // Apply the decoration to the active text editor
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    activeEditor.setDecorations(decorationType, [decoration]);
  }

  // Handle decoration click events
  const disposable = vscode.window.onDidChangeTextEditorSelection((event) => {
    if (event.textEditor === activeEditor) {
      const selection = event.selections[0];
      if (selection && selection.active.line === lineNumber) {
        // Open the URL when the decoration is clicked
        vscode.env.openExternal(vscode.Uri.parse(link));
      }
    }
  });

  // Dispose the decoration click event listener when the extension is deactivated
  context.subscriptions.push(disposable);
};
