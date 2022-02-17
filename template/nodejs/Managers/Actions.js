
function GUILD_LOADED_DD(bot, packet, shardId) {
    return bot.transformers.guild(bot, { guild: packet.d, _cache: true }, shardId);
}

const GUILD_CREATE = GUILD_LOADED_DD;

function GUILD_UPDATE(bot, packet, shardId) {
    const guild = bot.guilds.cache.base({ id: packet.d.id }, packet.d);
    return bot.guilds.cache.patch(guild.id, guild);
}

function GUILD_DELETE(bot, packet, shardId) {
    const guild = bot.guilds.cache._get(packet.d.id);
    if (!guild) return;
    guild.channels.clear();
    guild.threads.clear();
    guild.members.clear();
    guild.roles.clear();
    guild.emojis.clear();
    guild.stageInstances.clear();
    bot.guilds.cache.GUILD_DELETE(packet.d.id);
    return guild;
}

function GUILD_MEMBERS_CHUNK(bot, packet, shardId) {
    const guild = bot.guilds.cache.base({ id: packet.d.guild_id }, { members: true });
    guild.members = packet.d.members.map(x => bot.transformers.member(bot, x, packet.d.guild_id, BigInt(x.user.id)));
    packet.d._cache = true;
    return bot.guilds.cache.patch(packet.d.id, guild);
}

function GUILD_EMOJIS_UPDATE(bot, packet, shardId) {
    const guild = bot.guilds.cache._get(packet.d.guild_id);
    if (!guild) {
        guild = {id:  packet.d.guild_id};
        guild = bot.guilds.cache.base(guild, { emojis: true });
    }

    const old = guild.emojis.values({ raw: true });
    const rawEmojis = new Map(packet.d.emojis.map(x => [x.id, x]));

    for (const emoji of packet.d.emojis) {
        const cachedEmoji = guild.emojis._get(emoji.id);
        guild.emojis.patch(emoji.id, emoji);
        if (cachedEmoji) {

        } else {
            /// @emit EmojiCreate
        }
    }

    for (const emoji of old) {
        // Emoji deleted
        if (guild.emojis.has(emoji.id) && !rawEmojis.has(emoji.id)) {
            guild.emojis.delete(emoji.id);
            /// @emit EmojiDelete
        }
    }
    return bot.guilds.cache._set(guild.id, guild);
}

function GUILD_MEMBER_ADD(bot, packet, shardId) {
    const guild = bot.guilds.cache.base({ id: packet.d.guild_id }, { members: true });

    if (!guild.memberCount) guild.memberCount = 0;
    guild.memberCount++;

    guild.members = [
        bot.transformers.member(bot, packet.d, packet.d.guild_id, BigInt(packet.d.user.id))
    ],
        packet.d._cache = true;
    return bot.guilds.cache.patch(guild.id, guild);
}

function GUILD_MEMBER_REMOVE(bot, packet, shardId) {
    const guild = bot.guilds.cache._get(packet.d.guild_id);
    if (!guild) return;

    if (!guild.memberCount) guild.memberCount = 0;
    guild.memberCount--;

    guild.members.delete(BigInt(packet.d.user.id));
    return bot.guilds.cache._set(guild.id, guild);
}

function GUILD_MEMBER_UPDATE(bot, packet, shardId) {
    let guild = bot.guilds.cache._get(packet.d.guild_id);
    if (!guild) {
        guild = { id: packet.d.guild_id };
        guild = bot.guilds.cache.base(guild, { members: true });
    };

    const member = bot.transformers.member(bot, packet.d, packet.d.guild_id, BigInt(packet.d.user.id))

    guild.members.patch(packet.d.user.id, member);
    return bot.guilds.cache._set(guild.id, guild);
}

function GUILD_ROLE_CREATE(bot, packet, shardId) {
    const guild_id = BigInt(packet.d.guild_id);
    
    const guild = bot.guilds.cache.base({id: guild_id}, { roles: true });

    guild.roles = [bot.transformers.role(bot, { role: packet.d.role, guildId: guild_id })];
    return bot.guilds.cache.patch(guild.id, guild);
}

function GUILD_ROLE_UPDATE(bot, packet, shardId) {
    const guild = bot.guilds.cache._get(packet.d.guild_id);
    if (!guild) {
        guild = { id: packet.d.guild_id };
        guild = bot.guilds.cache.base(guild, { roles: true });
    };

    const role = bot.transformers.role(bot, { role: packet.d.role, guildId: BigInt(packet.d.guild_id) });
    guild.roles.patch(role.id, role);
    return bot.guilds.cache._set(guild.id, guild);
}

function GUILD_ROLE_DELETE(bot, packet, shardId) {
    const guild = bot.guilds.cache._get(packet.d.guild_id);
    if (guild) {
        guild.roles.delete(packet.d.role_id);
    } else {
        return bot.roles.cache.delete(packet.d.role_id);
    }
    return bot.guilds.cache._set(guild.id, guild);
}

function CHANNEL_CREATE(bot, packet, shardId) {
    const guild = bot.guilds.cache.base({id: packet.d.guild_id}, { channels: true });

    guild.channels = [bot.transformers.channel(bot, { channel: packet.d, guildId: BigInt(packet.d.guild_id) })];
    return bot.guilds.cache.patch(guild.id, guild);
}

function CHANNEL_UPDATE(bot, packet, shardId) {
    const guild = bot.guilds.cache._get(packet.d.guild_id);
    if (!guild) {
        guild = { id: packet.d.guild_id };
        guild = bot.guilds.cache.base(guild, { channels: true });
    };

    const channel = bot.transformers.channel(bot, { channel: packet.d, guildId: BigInt(packet.d.guild_id) });
    guild.channels.patch(channel.id, channel);
    return bot.guilds.cache._set(guild.id, guild);
}

function CHANNEL_DELETE(bot, packet, shardId) {
    const guild = bot.guilds.cache._get(packet.d.guild_id);
    if (guild) {
        guild.channels.delete(packet.d.id);
    } else {
        return bot.channels.cache.delete(packet.d.id);
    }
    return bot.guilds.cache._set(guild.id, guild);
}

function THREAD_CREATE(bot, packet, shardId) {
    const guild = bot.guilds.cache.base({id: packet.d.guild_id}, { threads: true });
    guild.threads = bot.transformers.channel(bot,{ channel: packet.d, guildId: BigInt(packet.d.guild_id) });
    return bot.guilds.cache.patch(guild.id, guild);
}

function THREAD_UPDATE(bot, packet, shardId) {
    const guild = bot.guilds.cache._get(packet.d.guild_id);
    if (!guild) {
        guild.id = packet.d.guild_id;
        guild = bot.guilds.cache.base(guild, { channels: true });
    };

    const channel = bot.transformers.channel(bot, { channel: packet.d, guildId: BigInt(packet.d.guild_id) });
    guild.threads.patch(channel.id, channel);
    return bot.guilds.cache._set(guild.id, guild);
}

function THREAD_DELETE(bot, packet, shardId) {
    const guild = bot.guilds.cache._get(packet.d.guild_id);
    if (guild?.threads) {
        guild.threads.delete(packet.d.id);
    } else {
        return bot.channels.cache.delete(packet.d.id);
    }
    return bot.guilds.cache._set(guild.id, guild);
}

/// Interaction Based Events

function MESSAGE_CREATE(bot, packet, shardId) {
    const channel = bot.channels.cache.base({id: packet.d.channel_id}, { messages: true });
    channel.messages = [bot.transformers.message(bot, packet.d)];
    return bot.channels.cache.patch(channel.id, channel);
}

function MESSAGE_UPDATE(bot, packet, shardId) {
    const channel = bot.channels.cache._get(packet.d.channel_id);
    if (!channel) return;
    const message = bot.transformers.message(bot, packet.d);
    channel.messages.patch(message.id, message);
    return bot.channels.cache._set(channel.id, channel);
}

function MESSAGE_DELETE(bot, packet, shardId) {
    const channel = bot.channels.cache._get(packet.d.channel_id);
    if (channel) {
        channel.messages.delete(packet.d.id);
    } else {
        return bot.messages.cache._delete(packet.d.id);
    }
    return bot.channels.cache._set(channel.id, channel);
}

function MESSAGE_DELETE_BULK(bot, packet, shardId) {
    const channel = bot.channels.cache._get(packet.d.channel_id);
    if (channel) {
        packet.d.ids.forEach(id => channel.messages.delete(id));
    } else {
        return packet.d.ids.forEach(id => bot.messages.cache._delete(id));
    }
    return bot.channels.cache._set(channel.id, channel);
}

function MESSAGE_REACTION_ADD(bot, packet, shardId) {
    const channel = bot.channels.cache._get(packet.d.channel_id);
    if (!channel) return;
    const message = channel.messages._get(packet.d.message_id);
    if (!message) return;
    const reaction = message.reactions.find(r => r.emoji.id === packet.d.emoji.id);
    if (reaction) {
        reaction.count = reaction.count + 1;
        message.reactions.splice(message.reactions.indexOf(reaction), 1);
        message.reactions.push(reaction);
        channel.messages.patch(message.id, message);
    }
    channel.messages.patch(message.id, message);
    return bot.channels.cache._set(channel.id, channel);
}

function MESSAGE_REACTION_REMOVE(bot, packet, shardId) {
    const channel = bot.channels.cache._get(packet.d.channel_id);
    if (!channel) return;
    const message = channel.messages._get(packet.d.message_id);
    if (!message) return;
    const reaction = message.reactions.find(r => r.emoji.id === packet.d.emoji.id);
    if (reaction) {
        reaction.count = reaction.count - 1;
        message.reactions.splice(message.reactions.indexOf(reaction), 1);
        message.reactions.push(reaction);
        channel.messages.patch(message.id, message);
    }
    return bot.channels.cache._set(channel.id, channel);
}

function MESSAGE_REACTION_REMOVE_ALL(bot, packet, shardId) {
    const channel = bot.channels.cache._get(packet.d.channel_id);
    if (!channel) return;
    const message = channel.messages._get(packet.d.message_id);
    if (!message) return;
    message.reactions = [];
    channel.messages.patch(message.id, message);
    return bot.channels.cache._set(channel.id, channel);
}

function MESSAGE_REACTION_REMOVE_EMOJI(bot, packet, shardId) {
    const channel = bot.channels.cache._get(packet.d.channel_id);
    if (!channel) return;
    const message = channel.messages._get(packet.d.message_id);
    if (!message) return;
    message.reactions = message.reactions.filter(r => r.emoji.id !== packet.d.emoji.id);
    channel.messages.patch(message.id, message);
    return bot.channels.cache._set(channel.id, channel);
}


function INTERACTION_CREATE(bot, packet, shardId) {
    return packet.d;
}

module.exports = {
    GUILD_LOADED_DD: GUILD_LOADED_DD,
    GUILD_CREATE: GUILD_CREATE,
    GUILD_UPDATE: GUILD_UPDATE,
    GUILD_DELETE: GUILD_DELETE,

    GUILD_MEMBERS_CHUNK: GUILD_MEMBERS_CHUNK,
    GUILD_MEMBER_ADD: GUILD_MEMBER_ADD,
    GUILD_MEMBER_REMOVE: GUILD_MEMBER_REMOVE,
    GUILD_MEMBER_UPDATE: GUILD_MEMBER_UPDATE,

    GUILD_ROLE_CREATE: GUILD_ROLE_CREATE,
    GUILD_ROLE_DELETE: GUILD_ROLE_DELETE,
    GUILD_ROLE_UPDATE: GUILD_ROLE_UPDATE,

    GUILD_EMOJIS_UPDATE: GUILD_EMOJIS_UPDATE,


    CHANNEL_CREATE: CHANNEL_CREATE,
    CHANNEL_DELETE: CHANNEL_DELETE,
    CHANNEL_UPDATE: CHANNEL_UPDATE,


    THREAD_CREATE: THREAD_CREATE,
    THREAD_UPDATE: THREAD_UPDATE,

    INTERACTION_CREATE: INTERACTION_CREATE,

    MESSAGE_CREATE: MESSAGE_CREATE,
    MESSAGE_UPDATE: MESSAGE_UPDATE,
    MESSAGE_DELETE: MESSAGE_DELETE,
    MESSAGE_DELETE_BULK: MESSAGE_DELETE_BULK,

    MESSAGE_REACTION_ADD: MESSAGE_REACTION_ADD,
    MESSAGE_REACTION_REMOVE: MESSAGE_REACTION_REMOVE,
    MESSAGE_REACTION_REMOVE_ALL: MESSAGE_REACTION_REMOVE_ALL,
    MESSAGE_REACTION_REMOVE_EMOJI: MESSAGE_REACTION_REMOVE_EMOJI,


}