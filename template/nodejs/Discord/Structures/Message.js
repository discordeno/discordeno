const DestructObject = require("./DestructObject");
const Collection = require("./Collection");
const {transformOptions} = require("../Util/transformOptions");

class Message extends DestructObject {
  constructor(client, message = {}, options = {}) {
    super(message);
    this.client = client;
    if (options.guild) this.guild = options.guild;
    else this.guild = client.guilds.forge({ id: this.guildId });
    this.channel = this.guild.channels.forge({ id: this.channelId }, { guild: this.guild });
    this.member = this.guild.members.forge({ ...message.member, id: this.authorId }, { guild: this.guild });
    this.author = client.users.forge({
      id: this.authorId,
      username: this.tag?.split("#")[0],
      discriminator: this.tag?.split("#")[1],
      bot: this.isBot,
    });
  }

  async edit(options) {
    options = transformOptions(options);

    return this.client.helpers.editMessage(this.channel.id, this.id, options);
  }

  async reply(options = {}) {
    options = transformOptions(options, {content: true});

    if (!options.messageReference) {
      options.messageReference = { messageId: this.id, channelId: this.channel.id, guildId: this.guild.id };
    }
    return this.client.helpers.sendMessage(this.channel.id, options);
  }

  async delete(options = {}) {
    options = transformOptions(options);

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


  ///Parse Members:
  get mentions()  {
    const channels = new Collection();
    const members = new Collection();
    const roles = new Collection();
    const users = new Collection();
  
    this.mentionedUserIds.forEach((u)=> {
      users.set(u, this.client.users.forge({ id: u }));
    })

    this.mentionedRoleIds.forEach((r)=> {
      roles.set(r, this.guild.roles.forge({ id: r }, { guild: this.guild }));
    })

    this.mentionedChannelIds.forEach((c)=> {
      channels.set(c, this.guild.channels.forge({ id: c }, { guild: this.guild }));
    })

    return {
      channels,
      members,
      roles,
      users,
    }

  }

}
module.exports = Message;
