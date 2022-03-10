const Guild = require("../Structures/Guild");
const {transformOptions} = require("../Util/transformOptions");

class Guilds {
  constructor(client, data = {}, options = {}) {
    this.client = client;
  }
  forge(data = {}) {
    data = transformOptions(data);

    if (typeof data.id === "string") data.id = BigInt(data.id);
    if (this.client.guilds.cache?.has(data.id)) {
      const v = this.client.guilds.cache?._get(data.id);
      const members = v.members;
      const channels = v.channels;
      const roles = v.roles;

      /*  delete v.members;  ///Causes that maps get deleted
             delete v.channels;
             delete v.roles; */
      // @warning: this causes that maps get deleted globally

      return new Guild(this.client, v, { roles: roles, channels: channels, members: members });
    }
    return new Guild(this.client, data, { roles: data.roles, channels: data.channels, members: data.members });
  }

  async fetch(options = {}) {
    options = transformOptions(options);

    const guild = await this.client.helpers.getGuild(options.id, options);
    return this.forge(guild);
  }
}
module.exports = Guilds;
