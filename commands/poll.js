const Discord = require("discord.js");

//Framework: incomplete
//Polish:

module.exports = {
    name: "poll",
    //aliases: ["rm"],
    args: true,
    description: "poll command", 
    async execute(message, args){
        //send poll instructions
        const mentionedC = message.mentions.channels.first() //channel for poll, if blank, in current
        let pollDes = args.slice(1).join(' ')

        /*
        if(!mentionedC) {
            let c = message.channel();
        }else{              INNEFFICIENT, REMOVED UNTIL FUTURE
            let c = mentionedC;
        } 
        */
        
    }
}