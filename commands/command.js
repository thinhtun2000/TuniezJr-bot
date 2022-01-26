module.exports = {
    name: 'command',
    description: "Embeds!",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#a3d9c9')
        .setTitle('Testing attempt 1!')
        .setURL('https://www.youtube.com/channel/UCOdIIlkKiT7tveuXdJhJNvQ')
        .setDescription('Testing embed :p')
        .addFields(
            {name: 'Hello', value: 'Cancer Lung!'},
            {name: 'YouTube', value: 'Sub to my channel!'}
        )
        .setImage('https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/777653/how-to-make-a-discord-bot-7c0fe302b98b05b145682344b3a4ec59.png')
        .setFooter('Bye!');

        message.channel.send({embeds: [newEmbed]});
    }
}