const DestructObject = require("./DestructObject");

class User extends DestructObject {
  constructor(client, user = {}) {
    super(user);
    this.client = client;
  }

  get tag() {
    return `#${this.username}#${this.discriminator}`;
  }
}
module.exports = User;
