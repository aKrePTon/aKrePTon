const db = require('pro.db');

module.exports = {
  name: 'setup-channel',
  description: 'Set up or delete a specific channel for the bot.',
  async execute(client, message, args) {
    const guildId = message.guild.id;
const owners = await db.get('owners') || [];
            if (!owners.includes(message.author.id)) {
                return message.reply("**You don't have permission to use this command. 🙄**");
            }
    if (!args[0]) {
      return message.reply('>  Please provide a channel ID, mention, or "delete" to remove the setup channel');
    }

    if (args[0].toLowerCase() === 'delete' || args[0].toLowerCase() === 'reset') {
      db.delete(`${guildId}_setupChannel`);
      return message.reply('Setup channel deleted');
    }

    let channelId = args[0].replace(/<#|>/g, '');
    if (!message.guild.channels.cache.has(channelId)) {
      return message.reply('Invalid channel ID or mention');
    }

    db.set(`${guildId}_setupChannel`, channelId);
    message.reply(`Setup channel set to ${message.guild.channels.cache.get(channelId).toString()}`);
  },
};