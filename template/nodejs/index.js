
const deno = require('discordeno');

const config = require('../config.json');

const EventManager = require('./Managers/EventManager.js');
const events = new EventManager({});

const client = deno.createBot({
    events: events.load({}),
    intents: ['Guilds', 'GuildMessages'],
    token: config.token,
})

client.config = config;

const CommandManager = require('./Managers/CommandManager.js');
client.commands = new CommandManager(client);
client.commands.load({})

deno.startBot(client)


