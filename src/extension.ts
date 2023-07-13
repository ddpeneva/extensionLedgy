// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

function showSpongeBob(context: vscode.ExtensionContext) {
  console.log('I am a teapot');

	const iconPath = vscode.Uri.file(
		path.join(context.extensionPath, 'src', 'spongebob.png')
	);
  // Register a decoration type
  const decorationType = vscode.window.createTextEditorDecorationType({
    gutterIconPath: iconPath,
    gutterIconSize: 'contain',
    overviewRulerLane: vscode.OverviewRulerLane.Right,
  });

  // Define the line number you want to decorate
  const lineNumber = 10;

  // Create a decoration range at the specified line number
  const decorationRange = new vscode.Range(
    lineNumber,
    0, // start column
    lineNumber,
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
  const disposable = vscode.window.onDidChangeTextEditorSelection(event => {
    if (event.textEditor === activeEditor) {
      const selection = event.selections[0];
      if (selection && selection.active.line === lineNumber) {
        // Open the URL when the decoration is clicked
        vscode.env.openExternal(vscode.Uri.parse('https://example.com'));
      }
    }
  });

  // Dispose the decoration click event listener when the extension is deactivated
  context.subscriptions.push(disposable);
}



const showInputBox = async () => {
	const editor = vscode.window.activeTextEditor;
	// const rp = require("request-promise");
	const text = editor &&  editor.document.getText(editor.selection);

	const notionPageTitle = await vscode.window.showInputBox({
		placeHolder: "Which Notion page are you looking for?",
	});
	
	// filename, line number, link
// 	// const options = {
	// method: "POST",
// 	// 	uri: "https://polite-gaufre-824dca.netlify.app/.netlify/functions/links",
// 	// 	headers: {
// 	// 		"User-Agent": "Request-Promise"
// 	// 	},
// 	// 	// here we want to send the file name and line
// 	// 	// body: {
// 	// 	//   description: "the description for this notion page",
// 	// 	//   public: true,
// 	// 	//   files: {}
// 	// 	// },
// 	// 	json: true
// 	// };
// 	// options.body.files[notionPageTitle] = { content: text };

// 	// rp(options).then(r => {
// 	// 	const parsedUrl = vscode.Uri.parse(r.html_url);
// 	// 	vscode.commands.executeCommand("vscode.open", parsedUrl);
// 	// });
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('We are live people!');
	showSpongeBob(context);
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello Ledgy Hackaton!');
		console.log('testing here too');
		showInputBox();
	});

	context.subscriptions.push(disposable);
}
// exports.activate = activate;
// This method is called when your extension is deactivated
export function deactivate() { }
// exports.deactivate = deactivate;
