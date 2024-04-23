const { Client, GatewayIntentBits } = require('discord.js');
const mainConfig = require('../../mainConfig.json');
const db = require('pro.db');
module.exports = {
  name: 'setup',
  description: 'Initialize bots using tokens from mainConfig.json',
  async execute(client, message, args) {
    const owners = await db.get('owners') || [];
    if (!owners.includes(message.author.id)) {
      return message.reply("**> You don't have permission to use this command.**");
    }
    for (let i = 1; i <= 10; i++) {
      const token = mainConfig.tokens[`t${i}`];
      if (!token) continue;

      const botClient = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildEmojisAndStickers,
          GatewayIntentBits.GuildIntegrations,
          GatewayIntentBits.GuildInvites,
          GatewayIntentBits.GuildVoiceStates,
          GatewayIntentBits.GuildPresences,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.GuildMessageReactions,
          GatewayIntentBits.GuildMessageTyping,
          GatewayIntentBits.DirectMessages,
          GatewayIntentBits.DirectMessageReactions,
          GatewayIntentBits.DirectMessageTyping,
          GatewayIntentBits.MessageContent
        ]
      });

      try {
        await botClient.login(token);
      } catch (error) {
        console.error(`Failed to login with token: ${token}`);
        continue;
      }

      const voiceChannelId = message.guild.members.resolve(botClient.user).voice?.channelId;
      if (!voiceChannelId) {
        message.channel.send(`>  ***${botClient.user.username}*** is not in a voice channel. **Setup failed.**`);
        botClient.destroy();
        continue;
      }

      const voiceChannel = message.guild.channels.cache.get(voiceChannelId);
      if (botClient.user.username === voiceChannel.name) {
        message.channel.send(`> **${botClient.user.username}** is already setuped.`);
        botClient.destroy();
        continue;
      }

      try {
        await botClient.user.setUsername(voiceChannel.name);
        message.channel.send(`> **${botClient.user.username}** setuped successfully with name **${voiceChannel.name}**`);
      } catch (error) {
        console.error(`Failed to set username for ${botClient.user.username}: ${error.message}`);
        message.channel.send(`>  Failed to setup **${botClient.user.username}**.`);
      } finally {
        botClient.destroy();
      }
    }
  },
};