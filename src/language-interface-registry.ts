import { comments } from "vscode";

export interface ICodeLanguage {
    _languageID: string;

    getName(): string; 
    getCommentStyle (ccomment: string) : string; 
}


export namespace ICodeLanguage {
    
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


@ICodeLanguage.register
class Cpp {

    _languageID: string = "cpp";
    
    getName(): string { return this._languageID; }
    
    getCommentStyle (comment: string): string {
        if (comment.length > 80) {
            let temp: string[] = comment.split(" ");
            let retComment: string = "/*\n *";
            let lineLength: number = 0;
            temp.forEach(word => {
                if ( (lineLength < 80) && (lineLength + word.length <= 80) ) {
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

@ICodeLanguage.register
class Java {

    _languageID: string = "java";
    
    getName(): string { return this._languageID; }
    
    getCommentStyle (comment: string): string {
        if (comment.length > 80) {
            let temp: string[] = comment.split(" ");
            let retComment: string = "/*\n *";
            let lineLength: number = 0;
            temp.forEach(word => {
                if ( (lineLength < 80) && (lineLength + word.length <= 80) ) {
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
