const Discord = require("discordeno");

// Ideally you should switch this to .env but for a template a config json is enough
const config = require("../config.json");

const EventManager = require("./Managers/EventManager.js");
// looping through all events and registering them
const events = new EventManager({});

const client = Discord.createBot({
  events: events.load({}),
  intents: ["Guilds", "GuildMessages"],
  token: config.token,
});

client.config = config;

// looping through all commands and registering them in .cache of the class
const CommandManager = require("./Managers/CommandManager.js");
client.commands = new CommandManager(client);
client.commands.load({});

// Starts your Bot
Discord.startBot(client);

/*
* You should handle all errors and fix the issues in your codes...
* process.on('unhandledRejection', (reason, p) => {console.log(reason, p)})
*/
