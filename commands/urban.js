const fetch = require('node-fetch');
const querystring = require('querystring');

//Framework: Done
//Polish: Semi

const Discord = require("discord.js");

module.exports = {
    name: "urban",
    args: true,
    aliases: ["ud", "dictionary"],
    description: "finds definition using urban dictionary", 
    async execute(message, args){
        if(!args.length) return message.channel.send("You must input a term")
        const query = querystring.stringify({ term: args.join(' ') });

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.json());
        if(!list.length) return message.channel.send("Couldn't find term on Urban Dictionary");
        //Embed
        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        const [answer] = list;
        const embed = new Discord.MessageEmbed() //ngl its from https://discordjs.guide/
            .setColor("34ebeb")
            .setTitle(answer.word)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
            );

        message.channel.send(embed)
    }
}