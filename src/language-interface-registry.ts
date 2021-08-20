// import "./codeLangauge_cpp";
// SOURCE: https://stackoverflow.com/questions/47082026/typescript-get-all-implementations-of-interface

export interface ICodeLanguage {
    _languageID: string;

    getName(): string;
    getCommentStyle(ccomment: string): string;
}

export namespace ICodeLanguageNS {
    export const lineLengthMax: number = 80;

    type Constructor<T> = {
        new(...args: any[]): T;
        readonly prototype: T;
    };

    const implementations: Constructor<ICodeLanguage>[] = [];
    export function getImplementations(): Constructor<ICodeLanguage>[] {
        return implementations;
    }
    export function register<T extends Constructor<ICodeLanguage>>(ctor: T) {
        implementations.push(ctor);
        return ctor;
    };
}

@ICodeLanguageNS.register
class Cpp implements ICodeLanguage {
    _languageID: string = "cpp";

    getName(): string { return this._languageID; }

    getCommentStyle(comment: string): string {
        if (comment.length > ICodeLanguageNS.lineLengthMax) {
            let temp: string[] = comment.split(" ");
            let retComment: string = "/*\n *";
            let lineLength: number = 0;
            temp.forEach(word => {
                if ((lineLength < ICodeLanguageNS.lineLengthMax) && (lineLength + word.length <= ICodeLanguageNS.lineLengthMax)) {
                    retComment += " " + word;
                    lineLength += word.length + 1;
                } else {
                    retComment += "\n *";
                    lineLength = 0;
                }
            });
            return retComment + "\n */";

        } else {
            return "// " + comment;
        }
    }
}

@ICodeLanguageNS.register
class Java implements ICodeLanguage {

    _languageID: string = "java";

    getName(): string { return this._languageID; }

    getCommentStyle(comment: string): string {
        if (comment.length > ICodeLanguageNS.lineLengthMax) {
            let temp: string[] = comment.split(" ");
            let retComment: string = "/*\n *";
            let lineLength: number = 0;
            temp.forEach(word => {
                if ((lineLength < ICodeLanguageNS.lineLengthMax) && (lineLength + word.length <= ICodeLanguageNS.lineLengthMax)) {
                    retComment += " " + word;
                    lineLength += word.length + 1;
                } else {
                    retComment += "\n *";
                    lineLength = 0;
                }
            });
            return retComment + "\n */";

        } else {
            return "// " + comment;
        }
    }
}

@ICodeLanguageNS.register
class Php implements ICodeLanguage {

    _languageID: string = "php";

    getName(): string { return this._languageID; }

    getCommentStyle(comment: string): string {
        if (comment.length > ICodeLanguageNS.lineLengthMax) {
            let temp: string[] = comment.split(" ");
            let retComment: string = "/*\n *";
            let lineLength: number = 0;
            temp.forEach(word => {
                if ((lineLength < ICodeLanguageNS.lineLengthMax) && (lineLength + word.length <= ICodeLanguageNS.lineLengthMax)) {
                    retComment += " " + word;
                    lineLength += word.length + 1;
                } else {
                    retComment += "\n *";
                    lineLength = 0;
                }
            });
            return retComment + "\n */";

        } else {
            return "// " + comment;
        }
    }
}

@ICodeLanguageNS.register
class Csharp implements ICodeLanguage {

    _languageID: string = "c#";

    getName(): string { return this._languageID; }

    getCommentStyle(comment: string): string {
        if (comment.length > ICodeLanguageNS.lineLengthMax) {
            let temp: string[] = comment.split(" ");
            let retComment: string = "/*\n *";
            let lineLength: number = 0;
            temp.forEach(word => {
                if ((lineLength < ICodeLanguageNS.lineLengthMax) && (lineLength + word.length <= ICodeLanguageNS.lineLengthMax)) {
                    retComment += " " + word;
                    lineLength += word.length + 1;
                } else {
                    retComment += "\n *";
                    lineLength = 0;
                }
            });
            return retComment + "\n */";

        } else {
            return "// " + comment;
        }
    }
}

@ICodeLanguageNS.register
class Go implements ICodeLanguage {

    _languageID: string = "go";

    getName(): string { return this._languageID; }

    getCommentStyle(comment: string): string {
        if (comment.length > ICodeLanguageNS.lineLengthMax) {
            let temp: string[] = comment.split(" ");
            let retComment: string = "/*\n *";
            let lineLength: number = 0;
            temp.forEach(word => {
                if ((lineLength < ICodeLanguageNS.lineLengthMax) && (lineLength + word.length <= ICodeLanguageNS.lineLengthMax)) {
                    retComment += " " + word;
                    lineLength += word.length + 1;
                } else {
                    retComment += "\n *";
                    lineLength = 0;
                }
            });
            return retComment + "\n */";

        } else {
            return "// " + comment;
        }
    }
}

@ICodeLanguageNS.register
class C implements ICodeLanguage {

    _languageID: string = "c";

    getName(): string { return this._languageID; }

    getCommentStyle(comment: string): string {
        if (comment.length > ICodeLanguageNS.lineLengthMax) {
            let temp: string[] = comment.split(" ");
            let retComment: string = "/*\n *";
            let lineLength: number = 0;
            temp.forEach(word => {
                if ((lineLength < ICodeLanguageNS.lineLengthMax) && (lineLength + word.length <= ICodeLanguageNS.lineLengthMax)) {
                    retComment += " " + word;
                    lineLength += word.length + 1;
                } else {
                    retComment += "\n *";
                    lineLength = 0;
                }
            });
            return retComment + "\n */";

        } else {
            return "// " + comment;
        }
    }
}