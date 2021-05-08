const Discord = require("discord.js")
const ms = require(`ms`);
//⏰


const color = "34ebeb"
module.exports={
  name: "remind",
  aliases: ["rm"],
  description: "sets a reminder", //Added
  async execute(message, args){
    let time = args[0]
    if (!time) return message.channel.send("**ERROR:** `please specify a time`")

    const reminder = args.join(" ").slice(args[0].length);

    if(reminder){
        if(!args[1]){//no reminder
            return message.channel.send("**ERROR:** `please specify a reminder`")
        }
        //Reminder Set Notification
        const setEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("**⏰ REMINDER**")
                .setDescription(`I will remind you in ${time}`)
        message.channel.send(setEmbed)


        //Reminder Time
        setTimeout(function () {
            const rmEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("**⏰ REMINDER**")
                .setDescription(`${reminder}`)
                .setFooter(`This reminder was set ${time} ago`);
            message.channel.send(rmEmbed) //sends in channel
            message.author.send(rmEmbed) //dms
        }, ms(time))
    } 

  }

};

//embed
