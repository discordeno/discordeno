class Permissions {
  constructor(permission) {
    this.bits = this.transform(permission);
  }

  _has(permission) {
    const hasPermssion = this.transform(permission);
    return (this.bits & hasPermssion) === hasPermssion;
  }

  has(permission, checkAdministrator = false) {
    return (checkAdministrator && this._has(this.constructor.FLAGS.ADMINISTRATOR)) || this._has(permission);
  }

  transform(bit) {
    const defaultBit = BigInt(0);
    if (Array.isArray(bit)) return bit.map((p) => this.transform(p)).reduce((prev, p) => prev | p, defaultBit);

    if (typeof defaultBit === typeof bit && bit >= defaultBit) return bit;
    if (typeof bit === "string") {
      if (typeof Permissions.FLAGS[bit] !== "undefined") return Permissions.FLAGS[bit];
      if (!isNaN(bit)) return typeof defaultBit === "bigint" ? BigInt(bit) : Number(bit);
    }
    throw new Error("Invalid Permission Bit");
  }

  freeze() {
    return Object.freeze(this);
  }
}

Permissions.FLAGS = {
  ADMINISTRATOR: 1n << 3n,

  BAN_MEMBERS: 1n << 2n,
  KICK_MEMBERS: 1n << 1n,

  MANAGE_GUILD: 1n << 5n,
  MANAGE_CHANNELS: 1n << 4n,
  MANAGE_NICKNAMES: 1n << 27n,
  MANAGE_ROLES: 1n << 28n,
  MANAGE_WEBHOOKS: 1n << 29n,
  MANAGE_EMOJIS_AND_STICKERS: 1n << 30n,

  VIEW_AUDIT_LOG: 1n << 7n,

  VIEW_CHANNEL: 1n << 10n,

  MANAGE_MESSAGES: 1n << 13n,
  SEND_MESSAGES: 1n << 11n,
  READ_MESSAGE_HISTORY: 1n << 16n,
  EMBED_LINKS: 1n << 14n,
  ADD_REACTIONS: 1n << 6n,
  ATTACH_FILES: 1n << 15n,
  SEND_TTS_MESSAGES: 1n << 12n,

  CREATE_INSTANT_INVITE: 1n << 0n,

  PRIORITY_SPEAKER: 1n << 8n,
  STREAM: 1n << 9n,

  MENTION_EVERYONE: 1n << 17n,
  USE_EXTERNAL_EMOJIS: 1n << 18n,
  VIEW_GUILD_INSIGHTS: 1n << 19n,
  CONNECT: 1n << 20n,
  SPEAK: 1n << 21n,
  MUTE_MEMBERS: 1n << 22n,
  DEAFEN_MEMBERS: 1n << 23n,
  MOVE_MEMBERS: 1n << 24n,
  USE_VAD: 1n << 25n,
  CHANGE_NICKNAME: 1n << 26n,

  USE_APPLICATION_COMMANDS: 1n << 31n,
  REQUEST_TO_SPEAK: 1n << 32n,
  MANAGE_EVENTS: 1n << 33n,
  MANAGE_THREADS: 1n << 34n,

  USE_PUBLIC_THREADS: 1n << 35n,
  CREATE_PUBLIC_THREADS: 1n << 35n,
  USE_PRIVATE_THREADS: 1n << 36n,
  CREATE_PRIVATE_THREADS: 1n << 36n,
  USE_EXTERNAL_STICKERS: 1n << 37n,
  SEND_MESSAGES_IN_THREADS: 1n << 38n,
  START_EMBEDDED_ACTIVITIES: 1n << 39n,
  MODERATE_MEMBERS: 1n << 40n,
};

Permissions.ALL = Object.values(Permissions.FLAGS).reduce((all, p) => all | p, 0n);

module.exports = Permissions;
