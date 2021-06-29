import * as vscode from "vscode";
import {ICodeLanguageNS} from "./language-interface-registry";
import fetch from 'cross-fetch';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vsgencomments" is now active!');
    vscode.window.showInformationMessage("Extension is running");

    //  generate the registry of all supported languages
    let languageRegistry = ICodeLanguageNS.getImplementations();
    
    let languageFactory = new Map();

    languageRegistry.forEach(language => {
        let temp = new language;
        languageFactory.set(temp.getName(), temp);
        console.log(temp.getName());
    });

    let disposable = vscode.commands.registerCommand(
            "vsgencomments.insertComment", 
            () => {
        
        // Get instance of edtior
        const editor  = vscode.window.activeTextEditor;
        if (!editor) { return; }
        // Select the text in the active editor and get the first line number
        let selection = editor.selection;
        let startLine = selection.start.line;
        // Select the text
        let selectedText = editor.document.getText(selection);
        let commentToInsert: string = "";
        let data: any = {};

        (async () => {
            try {
                const response = await fetch('http://localhost:3000/models/lamner', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "input=" + selectedText
                    
                });
                
                if (response.status >= 400) {
                throw new Error("Bad response from server");
                }
                
                data = await response.json();
                commentToInsert = data["response"];
            
                console.log(commentToInsert);

            } catch (err) { 
                console.error(err);
            }
            
            let documentLanguage: string = editor.document.languageId;
            console.log(commentToInsert);
            let languageObject = languageFactory.get(documentLanguage);
            let formattedComment: string = languageObject.getCommentStyle(commentToInsert);
            // perform async operation to utilize textDocument 'thenable' promise
            // Open document with the function with comment and language of the editor
            const previewDoc = await vscode.workspace.openTextDocument(
                {language: documentLanguage, content: (formattedComment + "\n" + selectedText)}
            );
            
            // Put the editor side by side 
            vscode.window.showTextDocument(
                previewDoc, vscode.ViewColumn.Beside, false
            );
            
            //  provide the user with clear indications of choice
            let userOptions: string[] = [
                "Yes: Close editor",
                "No: Leave open",
                "No: Close editor"
            ];
            
            // Give the user the options they have with the commented code preview
            const selection = await vscode.window.showInformationMessage(
                    "Here is your code with a comment!", 
                    ...userOptions
            ).then(selection => {
                // if user picks this option, a comment will be inserted
                if (selection === userOptions[0]) {
                    formattedComment += "\n";                                            
                
                    // convert selection "starting point" to :Position type
                    let positionToInsert: vscode.Position =
                        new vscode.Position(startLine, 0); 
                        
                    // use the editor builder class to stitch comment to their code
                    editor.edit((editBuilder: vscode.TextEditorEdit) => {
                        editBuilder.insert(positionToInsert, formattedComment);
                    });

                    // after inserting the comment, close the code previewer tab
                    (async () => {
                        await vscode.commands.executeCommand(
                            "workbench.action.closeActiveEditor"
                        );
                    })();
                    
            // todo: Decide if user deserves response
                    vscode.window.showInformationMessage("Cool");

                // leave editor open for the user
                } else if (selection === userOptions[1]) {
                    vscode.window.showInformationMessage("Sounds good, no worries");
                
                // Close the preview editor
                } else {
                    (async () => {
                        await vscode.commands.executeCommand(
                            "workbench.action.closeActiveEditor"
                        );
                    })();
                    
                    vscode.window.showInformationMessage(
                        "Our apologies, sorry to bother you"
                    );
                }
            });
        })();
    });
    context.subscriptions.push(disposable);
}
export function deactivate() {}