module.exports = {
    name: 'args-info',
    description: 'Testing commands and arguments',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't specify any arguments, ${message.author}!`);
        }

        message.channel.send(`Command name: args-info\nArguments: ${args}`);
    }
}