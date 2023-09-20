import { ApplicationCommandOptionTypes } from '@discordeno/types'
import type { Interaction, InteractionDataOption } from './index.js'

export function commandOptionsParser(interaction: Interaction, options?: InteractionDataOption[]): Record<string, any> {
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
        args[option.name] = interaction.data.resolved?.channels?.get(BigInt(option.value!))
        break
      case ApplicationCommandOptionTypes.Role:
        args[option.name] = interaction.data.resolved?.roles?.get(BigInt(option.value!))
        break
      case ApplicationCommandOptionTypes.User:
        args[option.name] = {
          user: interaction.data.resolved?.users?.get(BigInt(option.value!)),
          member: interaction.data.resolved?.members?.get(BigInt(option.value!)),
        }
        break
      case ApplicationCommandOptionTypes.Attachment:
        args[option.name] = interaction.data.resolved?.attachments?.get(BigInt(option.value!))
        break;
      case ApplicationCommandOptionTypes.Mentionable:
        // Mentionable are roles or users
        args[option.name] = interaction.data.resolved?.roles?.get(BigInt(option.value!)) ?? {
          user: interaction.data.resolved?.users?.get(BigInt(option.value!)),
          member: interaction.data.resolved?.members?.get(BigInt(option.value!)),
        }
        break
      default:
        args[option.name] = option.value
    }
  }

  return args
}
