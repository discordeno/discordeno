import type { GuildWidgetDetails } from "../../types/guilds/guildWidgetDetails.ts";
import type { Bot } from "../../bot.ts";

/** Returns the widget for the guild. */
export async function getWidget(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<GuildWidgetDetails>(
    bot.rest,
    "get",
    `${bot.constants.endpoints.GUILD_WIDGET(guildId)}.json`,
  );

  return {
    id: bot.transformers.snowflake(result.id),
    name: result.name,
    instantInvite: result.instant_invite,
    channels: result.channels.map((channel) => ({
      id: bot.transformers.snowflake(channel.id),
      name: channel.name,
      position: channel.position,
    })),
    members: result.members.map((member) => ({
      id: bot.transformers.snowflake(member.id),
      username: member.username,
      discriminator: Number(member.discriminator),
      avatar: member.avatar ? bot.utils.iconHashToBigInt(member.avatar) : undefined,
      status: member.status,
    })),
    presenceCount: result.presence_count,
  };
}
