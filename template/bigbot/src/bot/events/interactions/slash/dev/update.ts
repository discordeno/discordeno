import { ApplicationCommandOptionTypes } from "../../../../../../deps.ts";
import { replyToInteraction } from "../../../../../utils/replies.ts";
import { updateGlobalCommands, updateGuildCommands } from "../../../../../utils/updateSlash.ts";
import { createCommand } from "../createCommand.ts";

const command = createCommand({
  name: "UPDATE_NAME",
  description: "UPDATE_DESCRIPTION",
  dev: true,
  acknowledge: true,
  options: [
    {
      name: "UPDATE_GLOBAL_NAME",
      description: "UPDATE_GLOBAL_DESCRIPTION",
      type: ApplicationCommandOptionTypes.SubCommand,
    },
    {
      name: "UPDATE_GUILD_NAME",
      description: "UPDATE_GUILD_DESCRIPTION",
      type: ApplicationCommandOptionTypes.SubCommand,
      options: [
        {
          name: "UPDATE_GUILD_ID_NAME",
          description: "UPDATE_GUILD_ID_DESCRIPTION",
          type: ApplicationCommandOptionTypes.String,
          required: true,
        },
      ],
    },
  ] as const,
  execute: async function (bot, interaction, args) {
    if (args.global) {
      await updateGlobalCommands(bot);
      return await replyToInteraction(
        bot,
        interaction,
        "Updated Global Commands!",
      );
    }

    if (args.guild) {
      // GUILD COMMANDS
      await updateGuildCommands(bot, bot.transformers.snowflake(args.guild.id));
      return await replyToInteraction(
        bot,
        interaction,
        `Updated Guild Commands for Guild ID: ${args.guild.id}!`,
      );
    }
  },
});

export default command;
