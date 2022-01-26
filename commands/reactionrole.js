module.exports = {
    name: 'reactionrole',
    description: "Setting up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '930974715995123762';
        
        const role1 = message.guild.roles.cache.find(role => role.name === "Tuniez's");
        const role2 = message.guild.roles.cache.find(role => role.name === "Still Tuniez's but yellow");
        
        const role1_emoji = '🔴';
        const role2_emoji = '🟡';

        let embed = new Discord.MessageEmbed()
        .setColor('#e42643')
        .setTitle('Choose your team!')
        .setDescription('Better choose wisely!\n\n'
            + `${role1_emoji} for the first team\n`
            + `${role2_emoji} for the second team`);

        let messageEmbed = await message.channel.send({embeds: [embed]});
        messageEmbed.react(role1_emoji);
        messageEmbed.react(role2_emoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === role1_emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role1);
                }
                if (reaction.emoji.name === role2_emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role2);
                }
            } else { return; }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === role1_emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role1);
                }
                if (reaction.emoji.name === role2_emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role2);
                }
            } else { return; }
        });
    }
}