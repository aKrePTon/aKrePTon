const { ActivityType } = require('discord.js');
const db = require('pro.db'); 
const mainConfig = require('../mainConfig.json');
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    try {
      console.log((`Logged in as ${client.user.tag}`).green);
    } catch (err) {
      console.log(err) 
    }
  }
};