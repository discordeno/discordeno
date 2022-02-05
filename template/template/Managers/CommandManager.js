const resolveFolder = folderName => path.resolve(__dirname, ".", folderName);
const fs = require('fs');
const path = require('path');

class CommandManager {
    constructor(client) {
        this.client = client;
        this.cache = new Map();
        this.aliases = new Map();
    }
    load(options = {}) {
        const commandFolderPath = options.path || "../Plugins";
        const commandFolder = resolveFolder(commandFolderPath);
        if (options.category === undefined) options.category = true;
        if (options.plugins === undefined) options.plugins = true;
        //PluginMode will iterate through all SubFolders
        fs.readdirSync(commandFolder).map(async (dir) => {
            if (dir.endsWith(".txt")) return;
            if (!options.category && dir.endsWith(".js")) {
                const commandPath = path.join(commandFolder, dir);
                this.loadCommand(commandPath);
            } else {
                fs.readdirSync(path.join(commandFolder, dir)).map((cmd) => {
                    if (cmd.endsWith(".js") && !options.plugins) {
                        const commandPath = path.join(commandFolder, dir, cmd);
                        this.loadCommand(commandPath);
                    } else if (commandFolderPath === '../Plugins') {
                        if (cmd !== 'commands') return;
                        fs.readdirSync(path.join(commandFolder, dir, cmd)).map((cmdfile) => {
                            if (!cmdfile.endsWith(".js")) return;
                            const commandPath = path.join(commandFolder, dir, cmd, cmdfile);
                            this.loadCommand(commandPath);
                        })
                    }
                });
            }
        })
    }

    loadCommand(commandPath) {
        const pull = require(path.join(commandPath));
        if (pull.name) this.cache.set(pull.name, pull);
        if (pull.aliases) {
            pull.aliases.map((p) => this.aliases.set(p, pull));
        }
        return pull;
    }

    isCommand(message){
        if(message.isBot) return false;
        const prefix  = '!';
        const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const prefixRegex = new RegExp(`^(<@!?${this.client.userId}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return false;

        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);

        this.onMessage(message,prefix, args);   
        return true;
    }

    async onMessage(message, guild, args) {
        const commandName = args.shift().toLowerCase();
        const command = this.cache.get(commandName) //|| this.cache.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command && message.content.includes(this.client.userId)) {
            const options = { content: 'I did not found the Command!' }
            this.client.helpers.sendMessage(message.channelId, options);
        }
        if (!command) return;

        const messagecommand = new command({ manager: this, message: message, client: this.client, args: args, settings: {}, commandName: command.name });
        messagecommand.execute()?.catch?.((error) => {
            /* this.client.errorhandler.createrr(this.client, `message in ${message.guild.name}(${'`' + message.guild.id + '`'})`, message.content, error)
            return messagecommand.onError((error.code ?? 'custom')) */
        })
    }
}
module.exports = CommandManager;