const DestructObject = require("./DestructObject");
const PermissionOverwrites = require("./permissionOverwrites");
const Permissions = require("./Permissions");
const Webhook = require("./Webhook");
const Collection = require("./Collection");
const { transformOptions, transformAttachments,transformPermissionOverwrites } = require("../Util/transformOptions");
const {separateOverwrites} = require("../Util/Util");

class Channel extends DestructObject {
  /** 
  * @param {import('discordeno').Bot} client
  */
  constructor(client, channel = {}, options = {}) {
    super(channel, { "permissionOverwrites": true });
    this.client = client;

    if (options.guild) this.guild = options.guild;
    else if (channel.guildId) this.guild = client.guilds.forge({ id: this.guildId });

    this.messages = client.messages.forgeManager({}, { messages: options.messages, channel: this, guild: this.guild });
  }

  async create(options = {}, reason) {
    options = transformOptions(options);
    if (options.permissionOverwrites) {
      options.permissionOverwrites = transformPermissionOverwrites(options.permissionOverwrites);
    }
    const guildId = options.guildId || this.guildId;
    const channel = await this.client.helpers.createChannel(guildId, options, reason);
    return this.client.channels.forge(channel, { guild: this.guild });
  }

  async edit(options = {}, reason) {
    options = transformOptions(options);
    if (options.permissionOverwrites) {
      options.permissionOverwrites = transformPermissionOverwrites(options.permissionOverwrites);
    }
    const channel = await this.client.helpers.editChannel(this.id, options, reason);
    return this.client.channels.forge(channel, { guild: this.guild });
  }

  async delete(reason) {
    return this.client.helpers.deleteChannel(this.id, reason);
  }

  async fetch() {
    return this.client.channels.fetch(this.id);
  }

  async send(options = {}) {
    options = transformOptions(options, { content: true });

    if (options.attachments || options.files) {
      options.file = transformAttachments(options.attachments || options.files);
    }

    const msg = await this.client.helpers.sendMessage(this.id, options);
    return this.client.messages.forge(msg, { channel: this, guild: this.guild });
  }

  async bulkDelete(options = {}, reason) {
    options.map(x => BigInt(x ? x.id : x));
    return this.client.helpers.deleteMessages(this.id, options, reason);
  }

  get permissionOverwrites() {
    const cache = new Collection();

    this._permissionOverwrites.forEach(x => {
      let [ type, id, allow, deny ] = separateOverwrites(x);

      if(allow !== undefined) allow = new Permissions(allow).toArray();
      if(deny !== undefined) deny = new Permissions(deny).toArray();

      cache.set(id, new PermissionOverwrites(this.client, {type, id, allow, deny}, { channel: this }));
    })

    return new PermissionOverwrites(this.client, {}, { channel: this, permissionOverwrites: cache });
  }

  permissionsFor({ id }) {
    return this.permissionOverwrites.get(id);
  }


  //Webhook
  async createWebhook(options = {}, reason) {
    const webhook = await this.client.helpers.createWebhook(this.id, options, reason);
    return new Webhook(this.client, webhook, { channel: this });
  }

  async fetchWebhooks() {
    const webhooks = await this.client.helpers.getChannelWebhooks(this.id);
    const webhooksCollection = new Collection();
    webhooks.map(x => 
      webhooksCollection.set(x.id, new Webhook(this.client, x, { channel: this }))
    );
    return webhooksCollection;
  }

}
module.exports = Channel;
