import * as vscode from "vscode";
import {ICodeLanguageNS} from "./language-interface-registry";
import fetch from 'cross-fetch';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vsgencomments" is now active!'); // Todo: Remove in final product (prior to publishing)
    vscode.window.showInformationMessage("Extension is running"); // Todo: Remove in final product (prior to publishing)

    // Adding predefined languages to factory simplifies software extensibility
    let languageRegistry = ICodeLanguageNS.getImplementations();
    let languageFactory = new Map();

    languageRegistry.forEach(language => {
        let temp = new language;
        languageFactory.set(temp.getName(), temp);
        console.log(temp.getName()); // Todo: Remove in final product (prior to publishing)
    });

    let disposable = vscode.commands.registerCommand(
            "vsgencomments.insertComment", 
            () => {
        
        // Extenstion requries code to be passed to the model
        const editor  = vscode.window.activeTextEditor; 
        if (!editor) { return; }
        let selection = editor.selection;
        let selectedText = editor.document.getText(selection);
        let modelResponseComment: string = "";
        let modelResponseJSON: any = {};

        (async () => {
            try {
                const modelResponse = await fetch('http://localhost:3000/models/lamner', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "input=" + selectedText
                });
                
                if (modelResponse.status >= 400) {
                    throw new Error("Bad response from server");
                }
                
                modelResponseJSON = await modelResponse.json();
                modelResponseComment = modelResponseJSON["response"];
            
                console.log(modelResponseComment); // Todo: Remove in final product (prior to publishing) 

            } catch (err) { 
                console.error(err);
            }
            
            // Factory lets us define comment format per language
            let documentLanguage: string = editor.document.languageId;
            let languageObject = languageFactory.get(documentLanguage);
            let formattedComment: string = languageObject.getCommentStyle(
                modelResponseComment
            );

            
            

    //- --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- -//

            let positionToInsert: vscode.Position =
                new vscode.Position(selection.start.line, 0); 
            
            // Stitch the comment to their code
            editor.edit((editBuilder: vscode.TextEditorEdit) => {
                editBuilder.insert(positionToInsert, formattedComment + "\n" );
            });


            // creates decoration type
            let decorationOptions: vscode.DecorationRenderOptions = {
                backgroundColor: new vscode.ThemeColor("#FF0000")
            };
            let tempCommentDecType = vscode.window.createTextEditorDecorationType(
                decorationOptions
            );
            

            // comment here? or self documenting
            let splitComment: string[] = formattedComment.split("\n");
            let endOfCommentPosition: vscode.Position = new vscode.Position(
                    splitComment.length, 
                    splitComment[splitComment.length - 1].length + 1
            );
            let commentRange: vscode.Range = new vscode.Range(
                positionToInsert, endOfCommentPosition
            );
            let ourRanges: vscode.Range[] = [];
            ourRanges.push(commentRange);
            console.log("Ranges are: " + ourRanges[0].start, ourRanges[0].end);

            editor.setDecorations(
                tempCommentDecType,
                ourRanges
            );


    //- --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- -//
            // const previewDoc = await vscode.workspace.openTextDocument(
            //     {language: documentLanguage, content: (
            //         formattedComment + "\n" + selectedText
            //     )}
            // );
            
            // // Visually indicates what document looks like with the comment applied
            // vscode.window.showTextDocument(
            //     previewDoc, vscode.ViewColumn.Beside, false
            // );
            
    //- --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- -//


            // let userOptions: string[] = [
            //     "Yes: Close editor",
            //     "No: Leave open",
            //     "No: Close editor"
            // ];
            
            // // Give the user the options they have with the commented code preview
            // const selectedOption = await vscode.window.showInformationMessage(
            //         "Would you like to apply these changes?", 
            //         ...userOptions
            // ).then(selectedOption => {

            //     // comment will be inserted
            //     if (selectedOption === userOptions[0]) {
            //         formattedComment += "\n";                                            
                


            //     //- --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- -//

            //         // let positionToInsert: vscode.Position =
            //         //     new vscode.Position(selection.start.line, 0); 
                        
            //         // // Stitch the comment to their code
            //         // editor.edit((editBuilder: vscode.TextEditorEdit) => {
            //         //     editBuilder.insert(positionToInsert, formattedComment);
            //         // });

            //     //- --- --- --- --- ,,, --- ''' pXq ''' --- ,,, --- --- --- --- -//


            //         (async () => {
            //             await vscode.commands.executeCommand(
            //                 "workbench.action.closeActiveEditor"
            //             );
            //         })();
                    
            //         vscode.window.showInformationMessage("Operation Successful"); // todo: Decide if user deserves response

            //     // leave editor open 
            //     } else if (selectedOption === userOptions[1]) {
            //         vscode.window.showInformationMessage("Lingering the Opertion");
                
            //     // Close the preview editor
            //     } else {
            //         (async () => {
            //             await vscode.commands.executeCommand(
            //                 "workbench.action.closeActiveEditor"
            //             );
            //         })();
                    
            //         vscode.window.showInformationMessage(
            //             "Cancelling Operation"
            //         );
            //     }
            // });
        })();
    });
    context.subscriptions.push(disposable);
}
export function deactivate() {}