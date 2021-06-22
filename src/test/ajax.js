// function getComments (selectedText) {
//     var xhttp = new XMLHttpRequest();
//     var returnString;
//     xhttp.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             return this.responseText;
//         }
//     };
//     xhttp.open("POST", "http://localhost:3000", true);
//     xhttp.send("input=" + selectedText);
// }




//     (async () => {
//         await fetch("http://localhost:3000", {
//         method: "POST",
//         headers: {
//             "content-Type": "application/json"
//         },
//         body: JSON.stringify("input=" + selectedText)
//     }).then(res => { return res.json(); }).then(data => console.log(data));
// });

import "domain";

const fetch = require("node-fetch");
export function getComments (selectedText) {
    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: "input=" + selectedText
    }).then(res => { 
        console.log("This is the response!!!");
        console.log(res);
        return res.text(); 
    }).then(data => {
        console.log("This should be the data??!?!?!");
        console.log(data);
    });
}


    // ROCCO's Mess
// function callback (genComment: string) {
//     commentToInsert = genComment;
// }

// getComments(selectedText, commentToInsert);
        // console.log(commentToInsert);


// (async () => {
//     await fetch("http://localhost:3000", {
//         method: "POST",
//         headers: {
//             "Content-Type": "text/plain"
//         },
//         body: "input=" + selectedText
//     }).then(response => {
//         console.log(response);
//         return response.text();
//     }).then(data => {
//         console.log(data);
//     })
//     // .then(undefined, err => console.error("IM IN ERROR"));
//     // .catch(error => console.log(error))
//     ;

//     console.log("waiting");
// });