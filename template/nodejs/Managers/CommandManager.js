const resolveFolder = (folderName) => path.resolve(__dirname, ".", folderName);
const fs = require("fs");
const path = require("path");

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
          } else if (commandFolderPath === "../Plugins") {
            if (cmd !== "commands") return;
            fs.readdirSync(path.join(commandFolder, dir, cmd)).map((cmdfile) => {
              if (!cmdfile.endsWith(".js")) return;
              const commandPath = path.join(commandFolder, dir, cmd, cmdfile);
              this.loadCommand(commandPath);
            });
          }
        });
      }
    });
  }

  loadCommand(commandPath) {
    const pull = require(path.join(commandPath));
    if (pull.name) {
      pull.path = commandPath;
      this.cache.set(pull.name, pull);
    }
    if (pull.aliases) {
      pull.aliases.map((p) => this.aliases.set(p, pull));
    }
    return pull;
  }

  reloadCommand(commandName) {
    const command = this.cache.get(commandName);
    if (!command) return;
    const commandPath = path.join(command.path);
    delete require.cache[require.resolve(commandPath)];
    return this.loadCommand(commandPath);
  }

  isCommand(message) {
    if (message.isBot) return false;
    const prefix = "!";
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${this.client.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return false;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);

    this.onMessage(message, prefix, args);
    return true;
  }

  isInteraction(interaction) {
    if (interaction.type !== 2) return;
    this.onInteraction(interaction);
  }

  async onMessage(message, guild, args) {
    const commandName = args.shift().toLowerCase();
    const command = this.cache.get(commandName); //|| this.cache.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command && message.content.includes(this.client.id)) {
      //Handle, when Command has not been found
      const options = { content: "I did not found the Command!" };
      this.client.helpers.sendMessage(message.channelId, options);
    }
    if (!command) return;

    const messagecommand = new command({
      manager: this,
      message: message,
      client: this.client,
      args: args,
      settings: {},
      commandName: command.name,
    });
    messagecommand.execute()?.catch?.((error) => {
      console.log(error);
      // Call Function on CommandResponse.js, handle the error
      return messagecommand.onError(error ?? "custom");
    });
  }

  async onInteraction(interaction) {
    const command = this.cache.get(interaction.data.name);
    if (!command) return;

    const args = [];
    //Map all Values and Args
    interaction.data.options.map((o) => {
      if (o.name) args.push(o.name);
      if (o.options) {
        o.options.map((o2) => {
          if (o2.value) return args.push(o2.value);
          if (o2.name) args.push(o2.name);
          if (o2.options) o2.options.map((v) => args.push(v.value));
        });
      }
    });

    const messagecommand = new command({
      manager: this,
      interaction: interaction,
      client: this.client,
      args: args,
      settings: {},
      commandName: command.name,
    });
    messagecommand.execute()?.catch?.((error) => {
      console.log(error);
      // Call Function on CommandResponse.js, handle the error
      return messagecommand.onError(error ?? "custom");
    });
  }
}
module.exports = CommandManager;
