import { ApplicationCommandOptionTypes, type DiscordInteraction } from '@discordeno/types'

export function commandOptionsParser(interaction: DiscordInteraction, options?: NonNullable<DiscordInteraction['data']>['options']): Record<string, any> {
  if (!interaction.data) return {}
  if (!options) options = interaction.data.options ?? []

  const args: Record<string, any> = {}

  for (const option of options) {
    switch (option.type) {
      case ApplicationCommandOptionTypes.SubCommandGroup:
      case ApplicationCommandOptionTypes.SubCommand:
        args[option.name] = commandOptionsParser(interaction, option.options)
        break
      case ApplicationCommandOptionTypes.Channel:
        args[option.name] = interaction.data.resolved?.channels?.[option.value as string]
        break
      case ApplicationCommandOptionTypes.Role:
        args[option.name] = interaction.data.resolved?.roles?.[option.value as string]
        break
      case ApplicationCommandOptionTypes.User:
        args[option.name] = {
          user: interaction.data.resolved?.users?.[option.value as string],
          member: interaction.data.resolved?.members?.[option.value as string],
        }
        break
      default:
        args[option.name] = option.value
    }
  }

  return args
}
