import { Bot, Collection } from "../../deps.ts";

/** These are custom properties you want to add to `bot` and have accessible everywhere. */
export interface BotClient extends Bot {
  commandVersions: Collection<bigint, number>;
}

export function setupBotClient(bot: BotClient) {
  bot.commandVersions = new Collection();
}
