module.exports = {
    name: 'args-info',
    description: 'Testing commands and arguments',
    args: true,
    usage: '<args>',
    execute(message, args) {
        message.channel.send(`Command name: args-info\nArguments: ${args}`);
    }
}