import { DEV_GUILD_ID } from "../../../../../configs.ts";
import { DiscordGatewayPayload, DiscordUnavailableGuild } from "../../../../../deps.ts";
import logger from "../../../../utils/logger.ts";
import { updateGuildCommands } from "../../../../utils/updateSlash.ts";
import { BotClient } from "../../../botClient.ts";
import { usesLatestCommandVersion } from "../../../database/commandVersion.ts";
import { commandVersions } from "../../../database/kwik.ts";

export async function setGuildCommands(bot: BotClient, data: DiscordGatewayPayload) {
  if (!data.t) return;

  if (data.t === "GUILD_DELETE") {
    const id = (data.d as DiscordUnavailableGuild).id;
    await commandVersions.delete(id);
    bot.commandVersions.delete(bot.transformers.snowflake(id));
    return;
  }

  const id = bot.transformers.snowflake(
    (["GUILD_CREATE", "GUILD_UPDATE"].includes(data.t)
      ? // deno-lint-ignore no-explicit-any
        (data.d as any).id
      : // deno-lint-ignore no-explicit-any
        (data.d as any).guild_id ?? "") ?? "",
  );

  // IF NO ID FOUND CANCEL. IF ALREADY ON LATEST VERSION CANCEL.
  if (!id || await usesLatestCommandVersion(bot, id)) return;

  // DEV GUILD SHOULD BE IGNORED
  if (id === DEV_GUILD_ID) return;

  // NEW GUILD AVAILABLE OR NOT USING LATEST VERSION
  logger.info(
    `[Slash Setup] Installing slash commands on Guild ${id} for Event ${data.t}`,
  );
  await updateGuildCommands(bot, id);
}
