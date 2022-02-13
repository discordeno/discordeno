import { Bot } from "../bot.ts";
import { GetGuildWidget } from "../types/guilds/getGuildWidget.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformGetWidget(bot: Bot, payload: SnakeCasedPropertiesDeep<GetGuildWidget>): DiscordenoGetWidget {
  return {
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    instantInvite: payload.instant_invite ?? undefined,
    channels: payload.channels.map((channel) => ({})),
    members: payload.members.map((member) => ({})),
    presenceCount: payload.presence_count,
  };
}

interface DiscordenoGetWidget {
  /** guild id */
  id: bigint;
  /** guild name (2-100 characters) */
  name: string;
  /** instant invite for the guilds specified widget invite channel */
  instantInvite?: string;
  /** voice and stage channels which are accessible by @everyone */
  channels: {}[];
  /** special widget user objects that includes users presence (Limit 100) */
  members: {}[];
  /** number of online members in this guild */
  presenceCount: number;
}
