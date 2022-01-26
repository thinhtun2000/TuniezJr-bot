const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

module.exports = {
    name: 'play',
    description: 'Joins and plays a video from YouTube',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to execute this command!');

        if (!args.length) return message.channel.send('You need to send the second argument!');

        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
 
        if(validURL(args[0])){
 
            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.member.guild.id,
                adapterCreator: message.channel.guild.voiceAdapterCreator
            });
            const stream  = ytdl(args[0], {filter: 'audioonly'});
            
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);

            connection.on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('leaving channel');
            });
 
            await message.reply(`:thumbsup: Now Playing ***Your Link!***`);
 
            return;
        }

        // const connection = await joinVoiceChannel({
        //     channelId: message.member.voice.channel.id,
        //     guildId: message.member.guild.id,
        //     adapterCreator: message.channel.guild.voiceAdapterCreator
        // });

        // const videoFinder = async (query) => {
        //     const videoResult = await ytSearch(query);

        //     return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

        // }

        // const video = await videoFinder(args.join(' '));

        // if (video) {
        //     const stream = ytdl(video.url, {filter: 'audioonly'});
        //     connection.play(stream, {seek: 0, volume: 1})
        //     .on('finish', () => {
        //         voiceChannel.leave();
        //     });

        //     await message.reply(`:thumpsup: Now Playing ***${video.title}***`);
        // } else {
        //     message.channel.send('No video found!');
        // }

    }
}