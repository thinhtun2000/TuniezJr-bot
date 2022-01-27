const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGE_REACTIONS"
    ],
    partials: [
        "MESSAGE",
        "CHANNEL",
        "REACTION"
    ]
});

// bot prefix
const prefix = '!!';

// create this require in order to get access to other js files
const fs = require('fs');

// create a discord collection
client.commands = new Discord.Collection();

// make sure that all of the files that we are reading is going to be js files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Login as TuniezJr Bot!');
});

// When a member join, give them the role ONLINE
client.on('guildMemberAdd', (guildMember) => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'ONLINE');
    if(!guildMember.user.bot) guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('816401995774296144').send(`Welcome <@${guildMember.user.id}> to Cancer Lung!`);
});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // if the command is called, execute it
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'youtube') {
        client.commands.get('youtube').execute(message, args);
    } else if (command === 'command') {
        client.commands.get('command').execute(message, args, Discord);
    } else if (command === 'clear') {
        client.commands.get('clear').execute(message, args);
    } else if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client);
    } else if (command === 'play') {
        client.commands.get('play').execute(message, args);
    } else if (command === 'leave') {
        client.commands.get('leave').execute(message, args);
    } else if (command === 'play1') {
        client.commands.get('play1').execute(message, args);
    }
});

client.login(process.env.TOKEN);