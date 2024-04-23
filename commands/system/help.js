const { EmbedBuilder, Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const mainConfig = require('../../mainConfig.json');

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
    async execute (client, message, args) {
        const globPromise = promisify(glob);
        const infoFiles = await globPromise(`${process.cwd()}/commands/info/*.js`);
        const systemFiles = await globPromise(`${process.cwd()}/commands/system/*.js`);

        let embed_1 = new EmbedBuilder();

        infoFiles.map((value) => {
            const file = require(value);
            const splitted = value.split("/");
            const directory = splitted[splitted.length - 2];

            if (file.name) {
                const properties = { directory, ...file };
                embed_1.addFields({ name: `${mainConfig.mainPrefix}${properties.name}`, value: `${properties.description}`, inline: true });
            }
        });

        systemFiles.map((value) => {
            const file = require(value);
            const splitted = value.split("/");
            const directory = splitted[splitted.length - 2];

            if (file.name) {
                const properties = { directory, ...file };
                embed_1.addFields({ name: `${mainConfig.mainPrefix}${properties.name}`, value: `${properties.description}`, inline: true });
            }
        });

        message.channel.send({ embeds: [embed_1] });
    },
};