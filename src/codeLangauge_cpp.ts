// import {ICodeLanguage, ICodeLanguageNS.register} from "./language-interface-registry";
// import {  } from "./language-interface-registry";

// @register
// export default class Cpp implements ICodeLanguage {

//     _languageID: string = "cpp";
    
//     getName(): string { return this._languageID; }
    
//     getCommentStyle (comment: string): string {
//         if (comment.length > 80) {
//             let temp: string[] = comment.split(" ");
//             let retComment: string = "/*\n *";
//             let lineLength: number = 0;
//             temp.forEach(word => {
//                 if ( (lineLength < 80) && (lineLength + word.length <= 80) ) {
//                     retComment += " " + word;
//                     lineLength += word.length + 1;
//                 } else {
//                     retComment += "\n *";
//                     lineLength = 0;
//                 }
//             });
//             return retComment + "\n */";

//         } else {
//             return "// " + comment;
//         }  
//     }
// }