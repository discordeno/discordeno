import { Bot } from "../../bot.ts";
import { DiscordAllowedMentions } from "../../deps.ts";
import { AllowedMentions } from "../../typings.ts";

export function transformAllowedMentionsToDiscordAllowedMentions(
  bot: Bot,
  mentions: AllowedMentions,
): DiscordAllowedMentions {
  return {
    parse: mentions.parse,
    replied_user: mentions.repliedUser,
    users: mentions.users?.map((id) => id.toString()),
    roles: mentions.roles?.map((id) => id.toString()),
  };
}
