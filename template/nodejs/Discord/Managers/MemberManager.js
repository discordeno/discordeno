const Member = require("../Structures/Member");
const Collection = require("../Structures/Collection");
const {transformOptions} = require("../Util/transformOptions");
class Members {
  /** 
  * @param {import('discordeno').Bot} client
  */
  constructor(client, data = {}, options = {}) {
    this.client = client;

    this.cache = options.members || new Collection();
    if (options.guild) this.guild = options.guild;
  }

  forge(data = {}, options = {}) {
    data = transformOptions(data);

    if (options.guild && data.id) {
      if (options.guild.members.cache?.has(data.id)) {
        return options.guild.members.cache.get(data.id, { guild: options.guild });
      }
    }
    return new Member(this.client, data, { guild: options.guild });
  }

  forgeManager(data = {}, options = {}) {
    return new Members(this.client, data, { guild: options.guild, members: options.members });
  }

  async fetch(options = {}) {
    options = transformOptions(options);
    const guildId = options.guildId || this.guild?.id;
    const memberId = options.id;

    if(!memberId){
      const rawMembers = await this.client.helpers.getMembers(guildId, options);
      const members = new Collection();
      for(const member of rawMembers){
        members.set(member.id, this.forge(member, {guild: this.guild}));
      }
      return members;
    }

    if (this.cache?.has(id)) return this.cache.get(id, { guild: this.guild });
    const member = await this.client.helpers.getMember(this.guild.id, id);
    return this.forge(member, { guild: this.guild });
  }
}
module.exports = Members;
