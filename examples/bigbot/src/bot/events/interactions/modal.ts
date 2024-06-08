import type { Interaction } from 'discordeno'
import type { BotWithCustomProps } from '../../bot.js'

export async function executeModalSubmit(bot: BotWithCustomProps, interaction: Interaction): Promise<void> {
  if (!interaction.data) return

  bot.logger.info(
    `[Modal] The ${interaction.data?.customId ?? 'UNKNWON'} modal was submitted in Guild: ${interaction.guildId} by ${
      interaction.user.id
    }.`,
  )

  await Promise.allSettled([
    // SETUP-DD-TEMP: Insert any functions you wish to run when a user clicks a button.
  ]).catch(console.log)
}
