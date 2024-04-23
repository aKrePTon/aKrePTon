const { EmbedBuilder, Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const mainConfig = require('../../../mainConfig.json');
const path = require('path'); 
module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
    async execute (client, message, args) {
      const currentFolderName = __dirname.split(path.sep).filter(folder => folder.startsWith("bot"));
        const globPromise = promisify(glob);
        const infoFiles = await globPromise(`${process.cwd()}/${currentFolderName}/commands/info/*.js`);
        const systemFiles = await globPromise(`${process.cwd()}/${currentFolderName}/commands/music/*.js`);
//console.log(currentFolderName) 
//console.log(`${process.cwd()}/${currentFolderName}/commands/music/*.js`)
        let embed_1 = new EmbedBuilder();

        infoFiles.map((value) => {
            const file = require(value);
            const splitted = value.split("/");
            const directory = splitted[splitted.length - 2];

            if (file.name) {
                const properties = { directory, ...file };
                embed_1.addFields({ name: `${mainConfig.mainClient.prefix}${properties.name}`, value: `${properties.description}`, inline: true });
            }
        });

        systemFiles.map((value) => {
            const file = require(value);
            const splitted = value.split("/");
            const directory = splitted[splitted.length - 2];

            if (file.name) {
                const properties = { directory, ...file };
                embed_1.addFields({ name: `${mainConfig.mainClient.prefix}${properties.name}`, value: `${properties.description}`, inline: true });
            }
        });

        message.channel.send({ embeds: [embed_1] });
    },
};