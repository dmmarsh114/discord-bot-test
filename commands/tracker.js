let m = 0;

module.exports = {
    name: 'm',
    description: 'Add or subtract a value from m',
    execute(message, args) {
        let math = args[0];
        let num;
        let response;

        if (args.length === 0) {
            return message.channel.send(`M's value is ${m}`);
        } else if (args.length < 2) {
            num = 1;
        } else {
            num = args[1];
        }

        if (math === '+' || math === 'add') {
            m += parseInt(num);
            response = `Added ${num} to m.`             
        } else if (math === '-' || math === 'minus') {
            m -= parseInt(num);
            response = `Subtracted ${num} from m.`             
        } else {
            message.reply(`${math} is an invalid operator. Please use +, add, -, or minus instead.`);
        }

        response += `\nM's value is now ${m}.`
        return message.channel.send(response);
    },
};