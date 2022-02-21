const User = require("../Structures/User");
class Users {
  constructor(client, data = {}, options = {}) {
    this.client = client;
    if (options.guild) this.guild = options.guild;
  }

  forge(data = {}) {
    return new User(this.client, data);
  }
}
module.exports = Users;
