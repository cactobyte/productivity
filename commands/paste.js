// // import PasteClient from "pastebin-api"; //NEEDS TO BE REQUIRE
// var PasteClient = require("pastebin-api");

// const pbClient = new PasteClient("DEV_API_KEY");  //process.env.["pastebin"]

// module.exports = {
//     name: "paste",
//     aliases: ["pb", "pastebin"],
//     description: "pastebin command", 
//     async execute(message, args){
//         let name = args[0]
//         const code = args.join(" ").slice[0]
//         console.log(name, code)

//         const url = await pbclient.createPaste({
//             code: code,
//             expireDate: "N",
//             format: "javascript",
//             name: name,
//             publicity: 0,
//         });

//         message.channel.send(url)


//     }
// }

// // Just wanted to know how to change an import (ESM Module) into a require (Normal NodeJs Module)

