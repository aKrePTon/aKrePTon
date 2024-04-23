const fs = require('fs');
const ascii = require('ascii-table');
const path = require('path'); // Import 'path' module for cross-platform compatibility

let table = new ascii(`Commands`);
table.setHeading('Command', 'Load Status');

module.exports = (client) => {
    fs.readdirSync(path.join(__dirname, '../commands')).forEach((folder) => {
        const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/${folder}`)).filter(file => file.endsWith('.js'));
        for (file of commandFiles) {
            try {
                const commandPath = path.join(__dirname, `../commands/${folder}/${file}`);
                let command = require(commandPath);
                if (command.name) {
                    client.commands.set(command.name, command);
                    table.addRow(file, '✅');
                } else {
                    table.addRow(file, '❌ (Missing "name" property)');
                }
            } catch (error) {
                console.error(`Error loading command "${file}":`, error);
                table.addRow(file, '❌ (Error)');
            }
        }
    });
    console.log(table.toString());
};