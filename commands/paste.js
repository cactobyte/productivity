const { PastebinClient } = require("@catte_/pastebin.js")
const pastebin = new PastebinClient(process.env["pastebin"])

module.exports = {
    name: "paste",
    aliases: ["pb", "pastebin"],
    description: "pastebin command", 
    async execute(message, args){
        let name = args[0]
        const code = args.slice(0).join(` `)
        
        console.log("PASTEBIN REQUEST:", name, "\nCODE:", code)

        const paste = await pastebin.pastes.create(code, {
            title: name,
            privacy: "unlisted",
            content: code,

        })

        message.channel.send(paste)
        //PASTEBIN API KEY NEEDS CHANGING

    }
}


