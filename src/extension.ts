import * as vscode from "vscode";
import { ICodeLanguageNS } from "./language-interface-registry";
import fetch from 'cross-fetch';
const cp = require('child_process');

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vsgencomments" is now active!'); // Todo: Remove in final product (prior to publishing)
    vscode.window.showInformationMessage("Extension is running"); // Todo: Remove in final product (prior to publishing)
    // let portNumber: string = "";
    // // Show input box to store a variable number
    // vscode.window.showInputBox({ prompt: "Which port is the server running on?", placeHolder: "Enter a port number" }).then(value => {
    //     // Store the value in the variable
    //     portNumber = String(value);
    // });

    // Adding predefined languages to factory simplifies software extensibility
    let languageRegistry = ICodeLanguageNS.getImplementations();
    let languageFactory = new Map();

    languageRegistry.forEach(language => {
        let temp = new language;
        languageFactory.set(temp.getName(), temp);
        // console.log(temp.getName()); // Debug Statement 
    });

    let disposable2 = vscode.commands.registerCommand("vsgencomments.install", () => {
        console.log("Yo, it worked boyyyy");
        let install = cp.exec('python ' + __dirname + '\\..\\src\\runserver.py install', (err: any, stdout: any, stderr: any) => {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (err) {
                console.log('error: ' + err);
            }
        });


        install.on('exit', (code: any) => {
            console.log("we have ");
        });
    });

    let disposable3 = vscode.commands.registerCommand("vsgencomments.run", () => {
        console.log("Yo, it worked boyyyy");
        let run = cp.exec('python ' + __dirname + '\\..\\src\\runserver.py run', (err: any, stdout: any, stderr: any) => {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (err) {
                console.log('error: ' + err);
            }
        });

        run.on('exit', (code: any) => {
            console.log("we have ");
        });
    });

    // let disposable4 = vscode.commands.registerCommand("vsgencomments.shutdown", () => {

    // });

    // Insert Comment Command
    let disposable1 = vscode.commands.registerCommand(
        "vsgencomments.insertComment",
        () => {
            // Extenstion requries code to be passed to the model
            const editor = vscode.window.activeTextEditor;
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

                    // console.log(modelResponseComment); // Debug Statement 

                } catch (err) {
                    console.error(err);
                }

                // Factory lets us define comment format per language
                let documentLanguage: string = editor.document.languageId;
                let languageObject = languageFactory.get(documentLanguage);
                let formattedComment: string = languageObject.getCommentStyle(
                    modelResponseComment
                );

                let positionToInsert: vscode.Position =
                    new vscode.Position(selection.start.line, 0);

                // Stitch the comment to their code
                editor.edit((editBuilder: vscode.TextEditorEdit) => {
                    editBuilder.insert(positionToInsert, formattedComment + "\n");
                });

                let highlightComment: vscode.ThemeColor = new vscode.ThemeColor(
                    "editor.selectionHighlightBackground"
                );

                // creates decoration type
                let tempCommentDecType = vscode.window.createTextEditorDecorationType({
                    backgroundColor: highlightComment
                });

                // comment here? or self documenting
                let splitComment: string[] = formattedComment.split("\n");
                let endOfCommentPosition: vscode.Position = new vscode.Position(
                    splitComment.length + positionToInsert.line,
                    0
                );

                let commentRange: vscode.Range = new vscode.Range(
                    positionToInsert, endOfCommentPosition
                );

                let emptyRange: vscode.Range[] = [];
                let ourRanges: vscode.Range[] = [];
                ourRanges.push(commentRange);

                editor.setDecorations(
                    tempCommentDecType,
                    ourRanges
                );

                let userOptions: string[] = [
                    "Yes: Apply comment",
                    "No: Remove comment"
                ];

                // Give the user the options they have with the commented code preview
                const selectedOption = await vscode.window.showInformationMessage(
                    "Would you like to apply this comment?",
                    ...userOptions
                ).then(selectedOption => {

                    // comment will be inserted
                    if (selectedOption === userOptions[0]) {
                        // formattedComment += "\n";                                            

                        editor.setDecorations(
                            tempCommentDecType,
                            emptyRange
                        );
                        vscode.window.showInformationMessage(
                            "Comment Inserted"
                        );

                        // Comment will be removed
                    } else {
                        editor.setDecorations(
                            tempCommentDecType,
                            emptyRange
                        );

                        editor.edit((editBuilder: vscode.TextEditorEdit) => {
                            editBuilder.delete(commentRange);
                        });

                        vscode.window.showInformationMessage(
                            "Comment Removed"
                        );
                    }
                });
            })();
        }); // End Insert Comment Command
    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
    // context.subscriptions.push(disposable3);
    // context.subscriptions.push(disposable4);


    // Swap online/local Server destination Command
    // need a global var used in 'insert' command that alternated with each use



}
export function deactivate() { }