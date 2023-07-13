import * as vscode from "vscode";

export const showInputBox = async () => {
  const editor = vscode.window.activeTextEditor;
  // const rp = require("request-promise");
  const text = editor && editor.document.getText(editor.selection);

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
