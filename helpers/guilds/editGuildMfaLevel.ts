import type { Bot } from "../../mod.ts";
import type { MfaLevels } from "../../types/shared.ts";

/** Modify a guild's MFA level. Requires guild ownership. */
export async function editGuildMfaLevel(bot: Bot, guildId: bigint, mfaLevel: MfaLevels, reason?: string) {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "POST",
    bot.constants.routes.GUILD_MFA_LEVEL(guildId),
    { level: mfaLevel, reason },
  );
}
