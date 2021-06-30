// import "./codeLangauge_cpp";

export interface ICodeLanguage {
    _languageID: string;
    
    getName(): string; 
    getCommentStyle (ccomment: string) : string; 
}

export namespace ICodeLanguageNS {
    
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

@ICodeLanguageNS.register
class Java implements ICodeLanguage {

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

@ICodeLanguageNS.register
class Php implements ICodeLanguage {

    _languageID: string = "php";
    
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

@ICodeLanguageNS.register
class Csharp implements ICodeLanguage {

    _languageID: string = "c#";
    
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

@ICodeLanguageNS.register
class Go implements ICodeLanguage {

    _languageID: string = "go";
    
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

@ICodeLanguageNS.register
class C implements ICodeLanguage {

    _languageID: string = "c";
    
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