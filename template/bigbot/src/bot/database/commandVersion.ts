import { BotClient } from "../botClient.ts";
import { commandVersions } from "./kwik.ts";

export const CURRENT_SLASH_COMMAND_VERSION = 1;

/** Whether the guild has the latest slash command version */
export async function usesLatestCommandVersion(
  bot: BotClient,
  guildId: bigint,
): Promise<boolean> {
  return (await getCurrentCommandVersion(bot, guildId)) ===
    CURRENT_SLASH_COMMAND_VERSION;
}

/** Get the current slash command version for this guild */
export async function getCurrentCommandVersion(
  bot: BotClient,
  guildId: bigint,
): Promise<number> {
  const current = await commandVersions.get(guildId.toString());
  if (current) return current.version;

  await commandVersions.set(
    guildId.toString(),
    { version: CURRENT_SLASH_COMMAND_VERSION },
  );
  bot.commandVersions.set(guildId, CURRENT_SLASH_COMMAND_VERSION);

  return CURRENT_SLASH_COMMAND_VERSION;
}

export async function updateCommandVersion(
  bot: BotClient,
  guildId: bigint,
): Promise<number> {
  // UPDATE THE VERSION SAVED IN THE DB
  await commandVersions.set(guildId.toString(), {
    version: CURRENT_SLASH_COMMAND_VERSION,
  });
  // UPDATE THE CACHED VERSION FOR NEXT CHECK
  bot.commandVersions.set(guildId, CURRENT_SLASH_COMMAND_VERSION);

  return CURRENT_SLASH_COMMAND_VERSION;
}
