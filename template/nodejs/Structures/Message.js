const DestructObject = require("./DestructObject");

const Channel = require("./Channel");
const Guild = require("./Guild");
const Member = require("./Member");
const User = require("./User");

class Message extends DestructObject {
  constructor(client, message = {}) {
    super(message);
    this.client = client;
    this.guild = new Guild(client, { id: this.guild_id || this.guildId });
    this.channel = new Channel(client, { id: this.channel_id || this.channelId }, { guild: this.guild });
    this.member = new Member(client, message.member, { guild: this.guild });
    this.author = new User(client, {
      id: this.author_id || this.authorId,
      username: this.tag?.split("#")[0],
      discriminator: this.tag?.split("#")[1],
      bot: this.isBot,
    });
  }

  async edit(options) {
    return this.client.helpers.editMessage(this.channel.id, this.id, options);
  }

  async reply(options = {}) {
    if (!options.messageReference) {
      options.messageReference = { messageId: this.id, channelId: this.channel.id, guildId: this.guild.id };
    }
    return this.client.helpers.sendMessage(this.channel.id, options);
  }

  async delete(options = {}) {
    return this.client.helpers.deleteMessage(this.channel.id, this.id, options.reason, options.delayMilliseconds);
  }

  async react(emoji) {
    return this.client.helpers.addReaction(this.channel.id, this.id, emoji);
  }

  async pin() {
    return this.client.helpers.pinMessage(this.channel.id, this.id);
  }

  async unpin() {
    return this.client.helpers.unpinMessage(this.channel.id, this.id);
  }
}
module.exports = Message;
