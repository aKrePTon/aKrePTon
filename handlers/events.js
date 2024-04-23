const fs = require('fs');
const path = require('path'); 

module.exports = (client) => {
const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const commandPath = path.join(__dirname, `../events/${file}`);
    const event = require(commandPath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}
}

