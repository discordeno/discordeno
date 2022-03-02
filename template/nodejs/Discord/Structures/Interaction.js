const DestructObject = require("./DestructObject");
const { transformOptions } = require("../Util/transformOptions");

const Constants = {
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
    CHANNEL_MESSAGE_WITH_SOURCE: 4,
    DEFERRED_UPDATE_MESSAGE: 6,
    UPDATE_MESSAGE: 7,
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8,
    MODAL: 9,
    FLAGS: { EPHEMERAL: 64 },
    INTERACTION_TYPES: {
        CHAT_INPUT: 1,
        APPLICATION_COMMAND: 2,
        CONTEXT_MENU: 2,
        MESSAGE_COMPONENT: 3,
        APPLICATION_COMMAND_AUTOCOMPLETE: 4,
    }
}
class Interaction extends DestructObject {
    /** 
    * @param {import('discordeno').Bot} client
    */
    constructor(client, interaction = {}) {
        super(interaction);
        this.raw = interaction;
        this.client = client;

        this.guild = client.guilds.forge({ id: this.guildId });
        this.channel = client.channels.forge({ id: this.channelId }, { guild: this.guild });
        this.member = this.guild.members.forge({ ...interaction.member, id: this.user.id }, { guild: this.guild });
    }

    isCommand() { return this.type === Constants.INTERACTION_TYPES.APPLICATION_COMMAND; }

    // @todo check Context Menu type and Component Type
    isChatInputCommand() { return this.type === Constants.INTERACTION_TYPES.CHAT_INPUT; }
    isContextMenu() { return this.isCommand(); }
    isContextMenuCommand() { return this.isCommand(); }
    isAutoComplete() { return this.type === Constants.INTERACTION_TYPES.APPLICATION_COMMAND_AUTOCOMPLETE; }
    isMessageComponent() { return this.type === Constants.INTERACTION_TYPES.MESSAGE_COMPONENT; }
    isSelectMenu() { return this.type === Constants.INTERACTION_TYPES.MESSAGE_COMPONENT; }
    isButton() { return this.type === Constants.INTERACTION_TYPES.MESSAGE_COMPONENT; }

    async deferReply(options = {}) {
        const Payload = { data: {}, type: Constants.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE };
        if (this.ephemeral) Payload.private = true;
        this.ephemeral = Payload.private;
        this.deferred = true;
        return this.client.helpers.sendInteractionResponse(this.id, this.token, options);
    }

    async deferUpdate(options = {}) {
        const Payload = { data: options, type: Constants.DEFERRED_UPDATE_MESSAGE };
        this.deferred = true;
        return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
    }

    async reply(options = {}) {
        options = transformOptions(options, { content: true });

        const Payload = { data: options, type: Constants.CHANNEL_MESSAGE_WITH_SOURCE };
        if (options.ephemeral) Payload.private = true;
        this.ephemeral = Payload.private;

        this.replied = true;
        return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
    }

    async popupModal(options = {}) {
        options = transformOptions(options);
        const Payload = { data: options, type: Constants.MODAL };

        this.replied = true;
        return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
    }

    async editReply(options = {}) {
        options = transformOptions(options, { content: true });
        this.replied = true;
        return this.client.helpers.editInteractionResponse(this.token, options);
    }

    async deleteReply(options = {}) {
        options = transformOptions(options);
        if (this.ephemeral) throw new Error('Ephemeral messages cannot be deleted');
        const messageId = this.messageId ? this.messageId : options.messageId;
        return this.client.helpers.deleteInteractionResponse(this.token, messageId);
    }

    async followUp(options = {}) {
        options = transformOptions(options, { content: true });
        const Payload = { data: options, type: Constants.CHANNEL_MESSAGE_WITH_SOURCE };
        return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
    }

    async update(options = {}) {
        options = transformOptions(options, { content: true });
        const Payload = { data: options, type: Constants.UPDATE_MESSAGE };
        this.replied = true;
        return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
    }

}
module.exports = Interaction;