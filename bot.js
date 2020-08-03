require('dotenv').config();
const fs = require('fs'); // file structure -- comes with Node!

// config discord.js
const Discord = require('discord.js');
const client = new Discord.Client();

// config params
const TOKEN = process.env.DISCORD_TOKEN;
const prefix = '!';

// config commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    // if the message does not start w/ prefix, or if the message was sent by a bot, then exit
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content === `${prefix}good bot`) {
        message.channel.send(':relaxed:');
    }

    // create an args variable that slices off the prefix entirely, removes the leftover whitespaces and then splits it into an array by spaces.
    // args.shift() will take the first element in array and return it while also removing it from the original array 
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // if the command does not exist
    if (!client.commands.has(commandName)) {
        message.reply("I'm sorry, I don't recognize that command :confused:");
        return;
    };

    const command = client.commands.get(commandName);

    // check if the command needed arguments but no arguments were provided
    // command.usage can be used to inform the user how to execute the command
    if (command.args && !args.length) {
        let reply = (`You didn't specify any arguments, ${message.author}!`);
        if (command.usage) {
            reply += `\nThe proper usage would be ${prefix}${command.name} ${command.usage}`;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(TOKEN);