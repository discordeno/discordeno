import type { Channel } from "../types/channels/channel.ts";
import type { DiscordOverwrite } from "../types/channels/overwrite.ts";
import { snowflakeToBigint } from "../util/bigint.ts";

/** Transforms a Channel object from discord api into a discordeno version for the Channel object. */
export async function transformChannel(data: Channel, guildId?: bigint) {
  const channel: DiscordenoChannel = {
    ...data,
    id: snowflakeToBigint(data.id),
    guildId: guildId || (data.guildId ? snowflakeToBigint(data.guildId) : 0n),
    lastMessageId: data.lastMessageId ? snowflakeToBigint(data.lastMessageId) : 0n,
    parentId: data.parentId ? snowflakeToBigint(data.parentId) : 0n,
    permissionOverwrites:
      data.permissionOverwrites?.map((permission) => ({
        ...permission,
        id: snowflakeToBigint(permission.id),
        allow: snowflakeToBigint(permission.allow),
        deny: snowflakeToBigint(permission.deny),
      })) || [],
  };

  return channel;
}

export interface DiscordenoChannel
  extends Omit<Channel, "id" | "guildId" | "lastMessageId" | "parentId" | "permissionOverwrites"> {
  permissionOverwrites: (Omit<DiscordOverwrite, "id" | "allow" | "deny"> & {
    id: bigint;
    allow: bigint;
    deny: bigint;
  })[];
  /** The id of the channel */
  id: bigint;
  /** The id of the guild, 0n if it is a DM */
  guildId: bigint;
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  lastMessageId?: bigint;
  /** Id of the parent category for a channel (each parent category can contain up to 50 channels) */
  parentId?: bigint;
}
