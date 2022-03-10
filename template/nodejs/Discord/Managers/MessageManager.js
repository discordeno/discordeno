const Message = require("../Structures/Message");
const Collection = require("../Structures/Collection");
const { transformOptions } = require("../Util/transformOptions");

class MessageManager {
  constructor(client, data = {}, options = {}) {
    this.client = client;
    if (options.guild) this.guild = options.guild;
    if (options.channel) this.channel = options.channel;

    this.cache = options.messages || new Collection();

  }

  forge(data = {}, options = {}) {
    data = transformOptions(data);

    if (options.channel) {
      if (options.channel.messages.cache?.has(data.id)) {
        return options.channel.messages.cache.get(data.id, { guild: options.guild ?? this.guild, channel: options.channel });
      }
    } else if (this.client.messages.cache?.has(data.id)) {
      return this.client.messages.cache.get(data.id, { guild: options.guild ?? this.guild });
    }
    return new Message(this.client, data, { guild: options.guild ?? this.guild, channel: options.channel });
  }

  forgeManager(data = {}, options = {}) {
    return new MessageManager(this.client, {}, { guild: options.guild, channel: options.channel, messages: options.messages });
  }

  async fetch(options = {}) {
    options = transformOptions(options);

    if (this.cache?.has(options.id)) return this.cache.get(options.id, { guild: this.guild, channel: this.channel });

    const channelId = options.channeId || this.channel?.id;

    if (options.id) {
      if (this.cache?.has(options.id)) return this.cache.get(options.id, { guild: this.guild });

      const msg = await this.client.helpers.getMessage(channelId, options.id);
      return this.forge(msg, { guild: this.guild, channel: this.channel });
    }
    return this.client.helpers.getMessages(channelId, options).then(msgs => {
      const messages = new Collection();
      for (const msg of msgs) {
        messages.set(msg.id, this.forge(msg, { guild: this.guild, channel: this.channel }));
      }
      return messages;
    })
  }
}
module.exports = MessageManager;
