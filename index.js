const Discord = require('discord.js');
const express = require("express");
const app = express();
const client = new Discord.Client();

const prefix = "!";
const cooldowns = new Discord.Collection();//COOLDOWNS

const fs = require("fs");
const Database = require("@replit/database")

//File System
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//Command Handler
client.on("message", async message => {
  if (message.author.bot) return; //If its not the bot's msg
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g); //Trim each msg into Args
  const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }

  //Settings
  if (command.args && !args.length) { 
    let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

  if (command.guildOnly && message.channel.type === 'dm') { //guildOnly
	  return message.reply('I can\'t execute that command inside DMs!');
  }

  //Cooldown
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  //Cooldown End


});//end

//Status
client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    activity: { name: "mr blue sky", type: "LISTENING" }, //auto adjust ?
  });
});

require('./server')();
client.login(process.env['TOKEN']);


