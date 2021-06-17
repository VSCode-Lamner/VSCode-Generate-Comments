import {ICodeLanguage} from "./language-interface-registry";

@ICodeLanguage.register
export class Cpp {
    _singleLineComment: string = "//";
    _multiLineComment: string = "/* . */";
    _languageID: string = "cpp";
    
    getName(): string { return this._languageID; }
    
    getCommentStyle (commentLength: number): string[] {
        let temp: string[] = ["", ""];
        if (commentLength > 80) {
            temp = this._multiLineComment.split(".");    
        } else {
            temp[0] = this._singleLineComment;
        }
        
        return temp;
    }

}