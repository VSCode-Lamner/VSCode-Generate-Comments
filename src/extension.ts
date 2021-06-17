import * as vscode from "vscode";
import {ICodeLanguage} from "./language-interface-registry";

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vsgencomments" is now active!');
    vscode.window.showInformationMessage("Extension is running");


//- --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- -//

    //  generate the registry of all supported languages
    var languageRegistry = ICodeLanguage.getImplementations();
    
    let languageFactory = new Map();

    languageRegistry.forEach(language => {
        let temp = new language;
        languageFactory.set(temp.getName(), temp);
        console.log(temp.getName());
    });

    
//- --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- -//

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
        // TODO: Use a POST request, to send the code to receive the comment
        let selectedText = editor.document.getText(selection);
        
        // TODO: Use a GET request to receive this comment
        // let commentToInsert: string = "Guy and Rocco Make and amazing team!!!";
        let commentToInsert: string = 
            "Guy and Rocco make an amazing team this is also more words for me to say can't believe this might work last thing is backslash n this is even more words because we areally wanna test out what our function is really going to really do!!!!"
        // Get language the user is using
        let documentLanguage: string = editor.document.languageId;

//- --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- -//

        let languageObject = languageFactory.get(documentLanguage);
        let formattedComment: string = languageObject.getCommentStyle(commentToInsert);


//- --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- -//


        // perform async operation to utilize textDocument 'thenable' promise
        (async () => {
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
                    
            //  todo: Decide if user deserves response
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
