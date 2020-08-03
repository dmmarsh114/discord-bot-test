module.exports = {
    name: 'insult',
    description: 'Insults the specified user.',
    args: true,
    usage: '<tagged user>',
    execute(message) {
        let member = message.mentions.users.first();
        if (!member) {
            return message.reply('I did not recognize that user. Did you try tagging them?');
        }
        let insults = [
            `Your mother dresses you funny, `,
            `Fuck you, `,
            `Eat shit, `,
            `You smell like cabbage, `
        ];
        let num = Math.floor(Math.random() * insults.length);
        message.channel.send(`${insults[num]} ${member}!`);
    },
};