const Emoji = require("../Structures/Emoji");
const Collection = require("../Structures/Collection");
class Emojis {
  /** 
  * @param {import('discordeno').Bot} client
  */
  constructor(client, data = {}, options = {}) {
    this.client = client;
    this.cache = options.emojis || new Collection();
    if (options.guild) this.guild = options.guild;
  }

  async create(options = {}, reason) {
    const guildId = options.guildId || this.guild?.id;

    return this.client.helpers.createEmoji(guildId, options)
  }

  forge(data = {}, options = {}) {
    if(typeof data === "string") data = {id: data};

    return new Emoji(this.client, data, { guild: options.guild });
  }

  forgeManager(data = {}, options = {}) {
    return new Emojis(this.client, data, { guild: options.guild, emojis: options.emojis });
  }

  async fetch(options = {}){
    if(typeof options === "string") options = {id: options};

    const guildId = options.guildId || this.guild?.id;
    const emojiId = options.id;

    if(!emojiId){
      const rawEmojis = await this.client.helpers.getEmojis(guildId);
      const emojis = new Collection();
      for(const emoji of rawEmojis){
        emojis.set(emoji.id, this.forge(emoji, {guild: this.guild}));
      }
      return emojis;
    }

    if (this.cache?.has(emojiId)) return this.cache.get(emojiId, { guild: this.guild });
    const emoji = await this.client.helpers.getEmoji(emojiId);
    return this.forge(emoji, {guild: this.guild});
  }
}
module.exports = Emojis;
