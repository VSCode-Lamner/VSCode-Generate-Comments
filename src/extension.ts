import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
console.log('Congratulations, your extension "vsgencomments" is now active!');
vscode.window.showInformationMessage("Extension is running");

let disposable = vscode.commands.registerTextEditorCommand("vsgencomments.insertComment", () => {

    // Get instance of edtior
    const editor  = vscode.window.activeTextEditor;
    if (!editor) {return;}

    // Select the text in the active editor
    let selection = editor.selection;
    
    // Get the starting line above the selected text
    let startLine = selection.start.line;
    
    // Select the text
    // TODO: Use a POST request, to send the code to receive the comment
    let selectedText = editor.document.getText(selection);
    
    // TODO: Use a GET request to receive this comment
    let commentToInsert: string = "// Guy and Rocco Make and amazing team!!!";
    // let commentToInsert: string = 
    //     "/* Guy and Rocco \n * Make an \n" + 
    //     " * amazing team!!!\n */";
    
    // Get language the user is using
    let lang: string = editor.document.languageId;

    // perform async operation to utilize textDocument 'thenable' promise
    (async () => {
        // Open document with the function with comment and language of the editor
        const previewDoc = await vscode.workspace.openTextDocument(
            {language: lang, content: (commentToInsert + "\n" + selectedText)}
        );

        // Put the editor side by side 
        vscode.window.showTextDocument(previewDoc, vscode.ViewColumn.Beside, false);

        let userOptions: string[] = ["Yes: Close editor", "No: Leave open", "No: Close editor"];
        const selection = await vscode.window.showInformationMessage(
            "Here is your code with a comment!", 
            ...userOptions).then(selection => 
        {
            // Insert the comment 
            if (selection === userOptions[0]) {
                commentToInsert += "\n";

                let positionToInsert: vscode.Position = new vscode.Position(startLine, 0); 
                editor.edit((editBuilder: vscode.TextEditorEdit) => {
                    editBuilder.insert(positionToInsert, commentToInsert);
                });

                (async () => {
                    await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
                })();
                
                vscode.window.showInformationMessage("Cool");

            } else if (selection === userOptions[1]) {
                vscode.window.showInformationMessage("Sounds good, no worries");
            } else {
                (async () => {
                    await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
                })();
                
                vscode.window.showInformationMessage("Our apologies, sorry to bother you");
            }
        });
    
    })();
});
context.subscriptions.push(disposable);
}
export function deactivate() {}
