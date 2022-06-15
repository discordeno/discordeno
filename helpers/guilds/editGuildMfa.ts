import type { Bot } from "../../bot.ts";
import type { MfaLevels } from "../../types/shared.ts";

/** Modify a guild's MFA level. Requires guild ownership. */
export async function editGuildMfa(bot: Bot, guildId: bigint, options: EditGuildMfa) {
  const result = await bot.rest.runMethod<MfaLevels>(
    bot.rest,
    "POST",
    bot.constants.routes.MODIFY_GUILD_MFA_LEVEL(guildId),
    { level: options.level },
  );

  return result;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level */
export interface EditGuildMfa {
  level: MfaLevels;
}
