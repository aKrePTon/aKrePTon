const { EmbedBuilder, Client } = require("discord.js");
const db = require('pro.db');
const leaders = ["483419985335549966"];
module.exports = {
    name: "owner",
    description: "Manage the list of owners.",
    aliases: ["owners"],
    async execute(client, message, args) {
        try {
            if (!message.guild) return;
            const owners = await db.get('owners') || [];
            if (!leaders.includes(message.author.id)) {
                return message.reply("**You don't have permission to use this command. 🙄**");
            }

            if (args[0] === 'add' || args[0] === 'a') {
                if (!args[1]) {
                    return message.reply({ content: '> **Please Mention a user or id**' })
                }
                const targetUser = message.mentions.users.first() || await client.users.fetch(args[1]);

                if (!targetUser) {
                    return message.reply('> ** Invalid user! 🙄**');
                }

                if (owners.includes(targetUser.id)) {
                    return message.reply('> **User is already an owner! 🙄**');
                }

                owners.push(targetUser.id);
                db.set('owners', owners);
                return message.reply(`> **Added ${targetUser.tag} to the owners list. 🤗 **`)
            } else if (args[0] === 'remove' || args[0] === 'r') {
                if (!args[1]) {
                    return message.reply({ content: '> **Please Mention a user or id**' })
                }
                const targetUser = message.mentions.users.first() || await client.users.fetch(args[1]);

                if (!targetUser) {
                    return message.reply('>  **Invalid user! 🙄**');
                }

                const index = owners.indexOf(targetUser.id);
                if (index === -1) {
                    return message.reply('> **User is not an owner! 🙄**');
                }

                owners.splice(index, 1);
                db.set('owners', owners);
                return message.reply(`> **Removed ${targetUser.tag} from the owners list. 🤗**`);
            } else if (args[0] === 'list' || args[0] === 'l') {
                const owners = await db.get('owners');

                if (owners.length === 0 || !owners) {
                    return message.channel.send('> The owner list is empty.');
                }

                const ownersList = owners.map(ownerId => {
                    const owner = message.guild.members.cache.get(ownerId);
                    return owner ? owner.toString() : `<@${ownerId}> (not in this server)`;
                }).join('\n');

                const embed = new EmbedBuilder()
                    .setTitle('Owner List')
                    .setDescription(`> Here are the owners:\n${ownersList}`)
                    .setColor('#0099ff');

                message.channel.send({ embeds: [embed] });
            } else {
                const e = new EmbedBuilder()
                    .setTitle("**Owner Command**")
                    .setDescription(`> **Usage**\nowner (add/remove) ${message.author}\nowner (add/remove) ${message.author.id}\nowner list`)
                    .setTimestamp()
                message.reply({ embeds: [e] })
            }
        } catch (error) {
            console.log(error);
        }
    }
};