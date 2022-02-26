const DestructObject = require("./DestructObject");
const {transformOptions} = require("../Util/transformOptions");

const seperateOverwrites = (m) => m;

class permissionOverwrites extends DestructObject {
    /** 
    * @param {import('discordeno').Bot} client
    */
    constructor(client, data = {}, options = {}) {
        super(data);
        this.overwriteId = data.overwriteId || data.id;
        this.channel = options.channel;
        this.client = client;
    }

    has(overwriteId) {
        return this.permissionOverwrites.find(overwrite => seperateOverwrites(overwrite).id === BigInt(overwriteId));
    }

    get(overwriteId) {
        const overwrite = this.permissionOverwrites.find(overwrite => seperateOverwrites(overwrite).id === BigInt(overwriteId));
        return new permissionOverwrites(this.client, overwrite, { channel: this.channel });
    }

    edit(options = {}) {
        options = transformOptions(options);

        const channelId = options.channelId || this.channel?.id;
        const overwriteId = options.overwriteId || options.id || this.overwriteId;

        return this.client.helpers.editChannelOverwrite(channelId, overwriteId, options);
    }

    delete(options = {}) {
        options = transformOptions(options);

        const channelId = options.channelId || this.channel?.id;
        const overwriteId = options.overwriteId || options.id || this.overwriteId;

        return this.client.helpers.deleteChannelOverwrite(channelId, overwriteId);
    }
}
module.exports = permissionOverwrites;