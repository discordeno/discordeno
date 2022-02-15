const DestructObject = require("./DestructObject");

const RoleManager = require("../Managers/RoleManager");
const MemberManager = require("../Managers/MemberManager");
const ChannelManager = require("../Managers/ChannelManager");

class Guild extends DestructObject {
  constructor(client, guild = {}) {
    super(guild);
    this.client = client;

    //Managers:
    this.roles = new RoleManager(client, {}, { guild: this });
    this.members = new MemberManager(client, {}, { guild: this });
    this.channels = new ChannelManager(client, {}, { guild: this });
  }
}
module.exports = Guild;
