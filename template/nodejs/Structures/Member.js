const DestructObject = require("./DestructObject");
const Guild = require("./Guild");
const RoleManager = require("../Managers/RoleManager");

class Member extends DestructObject {
  constructor(client, member = {}, options = {}) {
    super(member);
    this.client = client;

    if (options.guild) this.guild = options.guild;
    else if (member.guildId) this.guild = new Guild(client, { id: member.guildId });

    this.roles = new RoleManager(client, {}, { guild: this.guild, member: this });
  }
}
module.exports = Member;
