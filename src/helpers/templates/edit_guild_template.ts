import type { ModifyGuildTemplate } from "../../types/templates/modify_guild_template.ts";
import type { Template } from "../../types/templates/template.ts";
import type { Bot } from "../../bot.ts";

/**
 * Edit a template's metadata.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function editGuildTemplate(bot: Bot, guildId: bigint, templateCode: string, data: ModifyGuildTemplate) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  if (data.name?.length && (data.name.length < 1 || data.name.length > 100)) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (data.description?.length && data.description.length > 120) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  return await bot.rest.runMethod<Template>(
    bot.rest,
    "patch",
    `${bot.constants.endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
    {
      name: data.name,
      description: data.description,
    }
  );
}
