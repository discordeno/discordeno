
const Discord = require('discordeno');

// Ideally you should switch this to .env but for a template a config json is enough
const config = require('../config.json');

const EventManager = require('./Managers/EventManager.js');
// looping through all events and registering them
const events = new EventManager({});

const baseBot = Discord.createBot({
    events: events.load({}),
    intents: ['Guilds', 'GuildMessages'],
    token: config.token,
})

const {enableCachePlugin} = require('./Managers/CacheManager.js');
const client = enableCachePlugin(baseBot, {
    channels: {
        properties: ['guildId', 'id'],
    }
});

client.config = config;


// looping through all commands and registering them in .cache of the class
const CommandManager = require('./Managers/CommandManager.js');
client.commands = new CommandManager(client);
client.commands.load({})


client.user = {id: '12345678901234567'};
// Starts your Bot
Discord.startBot(client)

/* const packets = require('../../customcache/test.json');
console.log(packets.length);
packets.forEach(packet => {
    client.gateway.handleDiscordPayload(client, packet, 0);
}) */
/* 
* You should handle all errors and fix the issues in your codes...
* process.on('unhandledRejection', (reason, p) => {console.log(reason, p)})
*/



