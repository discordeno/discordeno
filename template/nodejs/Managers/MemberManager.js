const Member = require("../Structures/Member");
class Members {
  constructor(client, data = {}, options = {}) {
    this.client = client;

    if (options.guild) this.guild = options.guild;
  }

  forge(data = {}) {
    return new Member(this.client, data, { guild: this.guild });
  }
}
module.exports = Members;
