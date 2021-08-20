import * as vscode from "vscode";
import { ICodeLanguageNS } from "./language-interface-registry";
import fetch from 'cross-fetch';
const cp = require('child_process');

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vsgencomments" is now active!'); // Todo: Remove in final product (prior to publishing)
    vscode.window.showInformationMessage("Extension is running"); // Todo: Remove in final product (prior to publishing)

    //----- IF time permits
    // Swap online/local Server destination Command
    // need a global var used for fetch request in 'insert' command that alternated with each use of the switch command


    // Adding predefined languages to factory simplifies software extensibility
    let languageRegistry = ICodeLanguageNS.getImplementations();
    let languageFactory = new Map();

    languageRegistry.forEach(language => {
        let temp = new language;
        languageFactory.set(temp.getName(), temp);
    });

    let dirName: string = __dirname;
    let temp: string[] = dirName.split('\\');
    dirName = "";
    temp.forEach(element => {
        dirName += element + "\\\\";
    });

    let genTerminal: vscode.Terminal;
    let portNumber: string = "";

    let installCommand = vscode.commands.registerCommand("vsgencomments.install", () => {
        if (genTerminal) { genTerminal.dispose(); }
        genTerminal = vscode.window.createTerminal('VSGenComments');
        genTerminal.show(true);
        genTerminal.sendText('python ' + dirName + '..\\\\src\\\\runserver.py install');
    });

    let runCommand = vscode.commands.registerCommand("vsgencomments.run", () => {
        vscode.window.showInputBox(
            { prompt: "Which port should the server run on?", value: "3000" }
        ).then(value => {
            portNumber = String(value);
            if (genTerminal) { genTerminal.dispose(); }
            genTerminal = vscode.window.createTerminal('VSGenComments');
            genTerminal.show(true);
            genTerminal.sendText(
                'python '
                + dirName
                + '..\\\\src\\\\runserver.py run '
                + portNumber
            );
        });
    });

    // Insert Comment Command
    let disposable = vscode.commands.registerCommand(
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
                    const modelResponse = await fetch(
                        'http://localhost:'
                        + portNumber
                        + '/models/lamner',
                        {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: "input=" + selectedText
                        }
                    );

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
    context.subscriptions.push(disposable);
    context.subscriptions.push(installCommand);
    context.subscriptions.push(runCommand);

    // 0. Go over extension comments (us)
    // 1. Update README (user guide)
    // 2. Technical Documentation (prof)

}
export function deactivate() { }