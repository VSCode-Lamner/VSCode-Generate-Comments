import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsgencomments" is now active!');
  
  let disposable = vscode.commands.registerCommand("vsgencomments.insertComment", () => {
    // let content: string = "// This is a comment\n// that is 'generated' and\n// pulled from the server\n// ^_^\n\nGENIOUS";

    // Get instance of edtior
    const edtior  = vscode.window.activeTextEditor;
    if (!edtior) {return;}
    
    let content: string = "// Guy and Rocco Make and amazing team!!!";
    // Get language
    let lang: string = edtior.document.languageId;
    
    // debug message - to remove
    console.log(lang);

    // perform async operation to utilize textDocument 'thenable' promise
    (async () => {
      
      // debug message - to remove
      console.log("Trying to show the window");
      
      // Open document with the function with comment and language of the editor
      const previewDoc = await vscode.workspace.openTextDocument(
        {language: lang, content: content}
      );
      // Put the editor side by side 
      vscode.window.showTextDocument(previewDoc, vscode.ViewColumn.Beside, true);
  
      //  debug message to remove
      console.log("guess we already did that");

      let userOptions: string[] = ["Yes: Close editor", "No: Leave open", "No: Close editor"];
      const selection = await vscode.window.showInformationMessage("Here is your code with a comment!", ...userOptions).then(selection => {
        if (selection === userOptions[0]) {
        // Insert comment 
        vscode.window.showInformationMessage("Cool");
      } else if (selection === userOptions[1]) {
        vscode.window.showInformationMessage("Alright, we await your commands");
      } else {
        // Close window?
        vscode.window.showInformationMessage("Our apologies, sorry to bother you");
      }
      });


      
    })();
    
      vscode.window.showInformationMessage("Extension is running");
    }
  );
  
  context.subscriptions.push(disposable);
}
export function deactivate() {}