// Export a function that starts the bot
module.exports = () => {
//  const express = require('express');
  const { Client, Collection, Partials, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
  const mainConfig = require("./mainConfig.json"); 
const db = require('pro.db'); 
// const colors = require("colors");

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
    //  GatewayIntentBits.GuildWebhooks,
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
    ],
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.GuildMember,
      Partials.Reaction,
      Partials.GuildScheduledEvent,
      Partials.User,
      Partials.ThreadMember
    ],
    shards: "auto",
    allowedMentions: {
      parse: [],
      repliedUser: true
    },
  })

 client.setMaxListeners(25);
  require('events').defaultMaxListeners = 25;
// const path = require('path');


  process.on("unhandledRejection", e => {
 return console.log(e); 
}); 
process.on("uncaughtException", e => {
 return console.log(e); 
}); 
process.on("uncaughtExceptionMonitor", e => {
 return console.log(e); 
}); 

  module.exports = client;
  client.commands = new Collection();
  client.events = new Collection();
  ['commands', 'events'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
  })

client.login(mainConfig.mainBotToken).catch((err) => {
  console.log(err.message)
});
};