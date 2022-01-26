module.exports = {
    name: 'clear',
    description: "Delete messages!",
    async execute(message, args) {
        if(!args[0]) return message.reply("Please enter the amount of messages that you want to clear!");
        if(isNaN(args[0])) return message.reply("Please enter a number!");
        if(args[0] > 5) return message.reply("You cannot delete more than 5 messages!");
        if(args[0] < 1) return message.reply("You must delete at least 1 message!");

        await message.channel.messages.fetch({limit: ++args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}