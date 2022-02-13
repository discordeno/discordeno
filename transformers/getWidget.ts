import { Bot } from "../bot.ts";
import { GetGuildWidget } from "../types/guilds/getGuildWidget.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordStatusTypes } from "../types/gateway/statusTypes.ts";

export function transformGetWidget(bot: Bot, payload: SnakeCasedPropertiesDeep<GetGuildWidget>): DiscordenoGetWidget {
  return {
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    instantInvite: payload.instant_invite ?? undefined,
    channels: payload.channels.map((channel) => ({
      id: bot.transformers.snowflake(channel.id),
      name: channel.name,
      position: channel.position,
    })),
    members: payload.members.map((member) => ({
      activity: member.activity ?? undefined,
      avatarUrl: member.avatar_url ?? undefined,
      deaf: member.deaf ?? undefined,
      mute: member.mute ?? undefined,
      name: member.name,
      selfDeaf: member.self_deaf ?? undefined,
      selfMute: member.self_mute ?? undefined,
      status: member.status,
      suppress: member.suppress ?? undefined,
    })),
    presenceCount: payload.presence_count,
  };
}

export interface DiscordenoGetWidget {
  /** guild id */
  id: bigint;
  /** guild name (2-100 characters) */
  name: string;
  /** instant invite for the guilds specified widget invite channel */
  instantInvite?: string;
  /** voice and stage channels which are accessible by @everyone */
  channels: {
    id: bigint;
    name: string;
    position: number;
  }[];
  /** special widget user objects that includes users presence (Limit 100) */
  members: {
    activity?: { name: string };
    avatarUrl?: string;
    deaf?: boolean;
    mute?: boolean;
    name: string;
    selfDeaf?: boolean;
    selfMute?: boolean;
    status: DiscordStatusTypes;
    suppress?: boolean;
  }[];
  /** number of online members in this guild */
  presenceCount: number;
}
