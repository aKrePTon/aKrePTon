const { Client, GatewayIntentBits } = require('discord.js');
const mainConfig = require('../../mainConfig.json');
const db = require('pro.db');

module.exports = {
  name: 'setup-avatar',
  description: 'Change the bot avatar for all bots.',
  async execute(client, message, args) {
    const owners = await db.get('owners') || [];
    if (!owners.includes(message.author.id)) {
      return message.reply("**> You don't have permission to use this command.**");
    }

    if (!args[0] && message.attachments.size === 0) {
      return message.reply('Please provide an image URL or attach an image to change the bot avatar.');
    }

    let imageUrl = args[0];
    if (message.attachments.size > 0) {
      imageUrl = message.attachments.first().url;
    }

    // Check if the URL is a valid image URL
    const isValidImageUrl = /^https?:\/\/.*\.(png|jpg|jpeg|gif)$/i.test(imageUrl);
    if (!isValidImageUrl) {
      return message.reply('Invalid image URL. Please provide a direct link to an image file (png, jpg, jpeg, gif).');
    }

    // Change avatar for all bots
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

      try {
        await botClient.user.setAvatar(imageUrl);
        message.channel.send(`> **${botClient.user.username}** avatar changed successfully.`);
      } catch (error) {
        console.error(`Failed to set avatar for ${botClient.user.username}: ${error.message}`);
        message.channel.send(`>  Failed to change avatar for **${botClient.user.username}**.`);
      } finally {
        botClient.destroy();
      }
    }
  },
};