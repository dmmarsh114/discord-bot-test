require('dotenv').config();
const fs = require('fs'); // file structure -- comes with Node!
const Discord = require('discord.js');
const client = new Discord.Client();

const TOKEN = process.env.DISCORD_TOKEN;
const prefix = '!';

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    // if the message does not start w/ prefix, or if the message was sent by a bot, then exit
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // config command and arguments
    // create an args variable that slices off the prefix entirely, removes the leftover whitespaces and then splits it into an array by spaces.
    // args.shift() will take the first element in array and return it while also removing it from the original array 
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
    
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);

    } else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
    }
});

client.login(TOKEN);