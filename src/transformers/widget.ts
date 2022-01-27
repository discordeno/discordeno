import { Bot } from "../bot.ts";
import { GuildWidget } from "../types/guilds/guildWidget.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

import { DiscordenoChannel } from "./channel.ts";
import { DiscordenoMember } from "./member.ts";

export function transformWidget(bot: Bot, payload: SnakeCasedPropertiesDeep<GuildWidget>): DiscordenoWidget {
  return {
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    instantInvite: payload.instant_invite,
    channels: payload.channels.map((channel) => ({
      id: channel.id ? bot.transformers.snowflake(channel.id) : undefined,
      name: channel.name,
      position: channel.position,
    })),
    members: payload.members.map((member) => ({
      id: member.user?.id ? bot.transformers.snowflake(member.user.id) : undefined,
      username: member.user?.username,
      discriminator: Number(member.user?.discriminator),
      avatar: member.avatar ? bot.utils.iconHashToBigInt(member.avatar) : undefined,
    })),
    presenceCount: payload.presence_count,
  };
}

interface DiscordenoWidget {
  /** guild id */
  id: bigint;
  /** guild name (2-100 characters) */
  name: string;
  /** instant invite for the guilds specified widget invite channel */
  instantInvite: string | null;
  /** voice and stage channels which are accessible by @everyone */
  channels: Partial<DiscordenoChannel>[];
  /** special widget user objects that includes users presence (Limit 100) */
  members: Partial<DiscordenoMember>[];
  /** number of online members in this guild */
  presenceCount: number;
}
