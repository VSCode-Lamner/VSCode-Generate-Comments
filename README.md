# Lamner Comment Generator README

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

This extension interfaces with a server-based AI model that returns a text comment describing a function passed to the model as a parameter.
\
&nbsp;

## Features

- Currently produces one function level comment for a singly selected Java function per execution

- Presents the user with an in-text preview with a continue/cancel prompt

> Use the keyboard combination of &nbsp;`CTRL + ALT + ;` to generate the comment

&nbsp;

![vsgen-gif](https://github.com/kaminskg/VSCode-Generate-Comments/blob/main/documentation/vscode-extension-demo.gif?raw=true)

&nbsp;

## Requirements

Please have Git installed on to the system PATH, you can refer to the [following](https://git-scm.com/downloads) website for reference.

Please have Python installed on to the system PATH, you can refer to the [following](https://www.python.org/downloads/) website for reference.
&nbsp;

## Usage

1. Install Node.js, you can refer to the [following](https://nodejs.org/en/download/) website for reference.
2. Make sure to follow the #[Requirements](#requirements) section to properly run the server to load in the lamner model.
3. Run npm install to get all of the needed dependencies.
4. Open up a terminal instance in VSCode, and type in `npm run watch`
5. Hit `F5` to go into debug mode.
6. Run the following command `Lamner: Install Server` through the VSCode command palette (only need to do it once after the extension is first installed).
7. Next, run the following command `Lamner: Run Server` through the VSCode command palette.
8. Now you can select your desired functions, and use the keyboard shortcut to find the generated comment.
9. To shutdown the server you can either:
    - Close the VSCode edtior.  
    - Click the 'trash bin' icon on the terminal.
    - Enter `CTRL + C` on the terminal.
    - Or simply run the `Lamner: Shutdown Server` command through the VSCode command palette.
\
&nbsp;

## Extension Settings, Commands

This extension contributes the following palette commands:

- 'vsgencomments.insertComment': executes the model using the currently selected text.
- 'vsgencomments.install': clones the lamner model to the user's local machine.
- 'vsgencomments.run': runs the lamner model.
- 'vsgencomments.shutdown': disposes of the terminal instance which runs the lamner model.
\
&nbsp;

## Known Issues

No known issues to date
\
&nbsp;

## Lamner Model

The [following](https://github.com/Nathan-Nesbitt/CodeSummary) link will lead to the model that is installed in this extension.

## Release Notes

### 0.1.0

Initial development release of Lamner Comment Generator
