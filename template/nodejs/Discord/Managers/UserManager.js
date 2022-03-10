const User = require("../Structures/User");
const Collection = require("../Structures/Collection");
const {transformOptions} = require("../Util/transformOptions");

class Users {
  /** 
  * @param {import('discordeno').Bot} client
  */
  constructor(client, data = {}, options = {}) {
    this.client = client;

    this.cache = options.users || new Collection();
    if (options.guild) this.guild = options.guild;
  }

  async fetch(options = {}) {
    options = transformOptions(options);

    const userId = options.id;
    if (this.cache?.has(userId)) return this.cache.get(userId);
    const user = await this.client.helpers.getUser(userId);
    return this.forge(user);
  }

  forge(data = {}) {
    data = transformOptions(data);
    
    return new User(this.client, data);
  }
}
module.exports = Users;
