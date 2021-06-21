// function getComments (selectedText, commentToInsert) {
//     var xhttp = new XMLHttpRequest();
//     var returnString;
//     xhttp.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             commentToInsert += this.responseText;
//             // callback(this.responseText);
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



    // ROCCO's Mess
// function callback (genComment: string) {
//     commentToInsert = genComment;
// }

// getComments(selectedText, commentToInsert);
        // console.log(commentToInsert);