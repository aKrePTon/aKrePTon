const mainConfig = require('../../mainConfig.json'); 
const prefix = mainConfig.mainClient.prefix;
const np = mainConfig.mainClient.np;
const db = require('pro.db');
module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    try {
      const setupChannel = db.get(`${message.guild.id}_setupChannel`) 
      if (setupChannel) {
      if (message.channel.id != setupChannel) return;
       } 
      if (!message.content.startsWith(prefix) && !message.content.startsWith(`<@${client.user.id}>`) && !message.content.startsWith(np) || message.author.bot) {
  return;
}


const args = message.content.slice(message.content.startsWith(`<@${client.user.id}>`) ? `<@${client.user.id}>`.length : message.content.startsWith(np) ? np.length : prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();


      try {
        let commandFiles = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if (!commandFiles) return;
        if (commandFiles) {
            commandFiles.execute(client, message, args);
        }
      } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
      }
    } catch (err) {
      console.log(err) 
    }
  }
}