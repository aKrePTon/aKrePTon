// Export a function that starts the bot
module.exports = () => {
  const express = require('express');
  /*const app = express();

  app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
  });

  app.use('/ping', (req, res) => {
    res.send(new Date());
  });

  app.listen(9080, () => {
    console.log(('Express is ready.').blue.bold)
  });
*/
  const { Client, Collection, Partials, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
  const mainConfig = require("../mainConfig.json"); 
  const config = require("./config.json");

  const { glob } = require("glob");
  const { promisify } = require("util");
  const { joinVoiceChannel } = require('@discordjs/voice');
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');
  const { SlashCommandBuilder } = require('@discordjs/builders');
  const colors = require("colors");

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildWebhooks,
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
      repliedUser: false
    },
  })

  client.setMaxListeners(25);
  require('events').defaultMaxListeners = 25;
  const path = require('path');


  client.on('error', error => {
    console.error('Discord.js error:', error);
  });

  client.on('warn', warning => {
    console.warn('Discord.js warning:', warning);
  });

  let antiCrashLogged = false;

  process.on('unhandledRejection', (reason, p) => {
    if (!antiCrashLogged) {
      console.error('[antiCrash] :: Unhandled Rejection/Catch');
      console.error(reason, p);
      antiCrashLogged = true;
    }
  });

  process.on('uncaughtException', (err, origin) => {
    if (!antiCrashLogged) {
      console.error('[antiCrash] :: Uncaught Exception/Catch');
      console.error(err, origin);
      antiCrashLogged = true;
    }
  });

  process.on('uncaughtExceptionMonitor', (err, origin) => {
    if (!antiCrashLogged) {
      console.error('[antiCrash] :: Uncaught Exception/Catch (MONITOR)');
      console.error(err, origin);
      
      antiCrashLogged = true;
    }
  });

  module.exports = client;
  client.commands = new Collection();
  client.events = new Collection();
  ['commands', 'events'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
  })

  setTimeout(() => {
    if (!client || !client.user) {
      console.log("Client Not Login, Process Kill")
      process.kill(1);
    } else {
      console.log("Client Login")
    }
  }, 5 * 1000 * 60);

const currentFolderName = __dirname.split(path.sep).pop();
const botNumber = parseInt(currentFolderName.replace('bot', ''));
const tokenKey = `t${botNumber}`;
client.login(mainConfig.tokens[tokenKey]).catch((err) => {
  console.log(err.message)
});
};