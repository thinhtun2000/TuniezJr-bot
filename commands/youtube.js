module.exports = {
    name: 'youtube',
    description: "Send the YouTube link!",
    execute(message, args) {
        message.channel.send('https://www.youtube.com/channel/UCOdIIlkKiT7tveuXdJhJNvQ');
    }
}