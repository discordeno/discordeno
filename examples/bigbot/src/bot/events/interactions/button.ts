import { Interaction } from "discordeno";
import { BotWithCustomProps } from "../../bot.js";

export async function executeButtonClick(bot: BotWithCustomProps, interaction: Interaction) {
  if (!interaction.data) return;

  bot.logger.info(
    `[Button] The ${interaction.data.customId} button was clicked in Guild: ${interaction.guildId} by ${interaction.user.id}.`,
  );

  await Promise.allSettled([
    // SETUP-DD-TEMP: Insert any functions you wish to run when a user clicks a button.
  ]).catch(console.log);
}
