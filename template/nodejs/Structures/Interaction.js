const DestructObject = require("./DestructObject");
const Guild = require("./Guild");
const Channel = require("./Channel");
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
  },
};
class Interaction extends DestructObject {
  constructor(client, interaction = {}) {
    super(interaction);
    this.raw = interaction;
    this.client = client;

    this.guild = new Guild(client, { id: this.guild_id || this.guildId });
    this.channel = new Channel(client, { id: this.channel_id || this.channelId }, {
      internal: true,
      guild: this.guild,
    });
  }

  isCommand() {
    return this.type === Constants.INTERACTION_TYPES.APPLICATION_COMMAND;
  }

  // @todo check Context Menu type and Component Type
  isChatInputCommand() {
    return this.type === Constants.INTERACTION_TYPES.CHAT_INPUT;
  }
  isContextMenuCommand() {
    return this.isCommand();
  }
  isAutoComplete() {
    return this.type === Constants.INTERACTION_TYPES.APPLICATION_COMMAND_AUTOCOMPLETE;
  }
  isMessageComponent() {
    return this.type === Constants.INTERACTION_TYPES.MESSAGE_COMPONENT;
  }
  isSelectMenu() {
    return this.type === Constants.INTERACTION_TYPES.MESSAGE_COMPONENT;
  }
  isButton() {
    return this.type === Constants.INTERACTION_TYPES.MESSAGE_COMPONENT;
  }

  async deferReply(options = {}) {
    if (this.deferred || this.replied) throw new Error("Interaction has been already replied");
    const Payload = { data: {}, type: Constants.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE };
    options.type = 5;
    if (this.ephemeral) options.private = true;
    this.ephemeral = options.ephemeral || false;
    this.deferred = true;
    return this.client.helpers.sendInteractionResponse(this.id, this.token, options);
  }

  async deferUpdate(options = {}) {
    if (this.deferred || this.replied) throw new Error("Interaction has been already replied");
    this.deferred = true;
    const Payload = { data: options, type: Constants.DEFERRED_UPDATE_MESSAGE };
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }

  async reply(options = {}) {
    if (this.deferred || this.replied) throw new Error("Interaction has been already replied");
    this.ephemeral = options.ephemeral || false;
    if (this.ephemeral) options.private = true;
    this.replied = true;
    const Payload = { data: options, type: Constants.CHANNEL_MESSAGE_WITH_SOURCE };
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }

  async popupModal(options = {}) {
    if (this.deferred || this.replied) throw new Error("Interaction has been already replied");
    const Payload = { data: options, type: Constants.MODAL };
    this.replied = true;
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }

  async editReply(options = {}) {
    if (!this.deferred && !this.replied) throw new Error("Interaction has not been replied");
    this.replied = true;
    const messageId = this.messageId ? this.messageId : options.messageId;
    return this.client.helpers.editInteractionResponse(this.token, options);
  }

  async deleteReply(options = {}) {
    if (this.ephemeral) throw new Error("Ephemeral messages cannot be deleted");
    const messageId = this.messageId ? this.messageId : options.messageId;
    return this.client.helpers.deleteInteractionResponse(this.token, messageId);
  }

  async followUp(options = {}) {
    if (!this.replied || !this.deferred) throw new Error("Interaction has not been replied");
    const Payload = { data: options, type: Constants.CHANNEL_MESSAGE_WITH_SOURCE };
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }

  async update(options = {}) {
    if (this.deferred || this.replied) throw new Error("Interaction has been already replied");
    const Payload = { data: options, type: Constants.UPDATE_MESSAGE };
    this.replied = true;
    return this.client.helpers.sendInteractionResponse(this.id, this.token, Payload);
  }
}
module.exports = Interaction;
