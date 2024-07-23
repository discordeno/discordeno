import { ApplicationCommandOptionTypes } from '@discordeno/types'
import type { Attachment, Channel, Interaction, InteractionDataOption, Member, Role, User } from './index.js'

export function commandOptionsParser(interaction: Interaction, options?: InteractionDataOption[]): ParsedInteractionOption {
  if (!interaction.data) return {}
  if (!options) options = interaction.data.options ?? []

  const args: ParsedInteractionOption = {}

  for (const option of options) {
    switch (option.type) {
      case ApplicationCommandOptionTypes.SubCommandGroup:
      case ApplicationCommandOptionTypes.SubCommand:
        args[option.name] = commandOptionsParser(interaction, option.options)
        break
      case ApplicationCommandOptionTypes.Channel:
        args[option.name] = interaction.data.resolved?.channels?.get(BigInt(option.value!)) as InteractionResolvedChannel
        break
      case ApplicationCommandOptionTypes.Role:
        args[option.name] = interaction.data.resolved?.roles?.get(BigInt(option.value!)) as Role
        break
      case ApplicationCommandOptionTypes.User:
        args[option.name] = {
          user: interaction.data.resolved?.users?.get(BigInt(option.value!)) as User,
          member: interaction.data.resolved?.members?.get(BigInt(option.value!)) as InteractionResolvedMember,
        }
        break
      case ApplicationCommandOptionTypes.Attachment:
        args[option.name] = interaction.data.resolved?.attachments?.get(BigInt(option.value!)) as Attachment
        break
      case ApplicationCommandOptionTypes.Mentionable:
        // Mentionable are roles or users
        args[option.name] = (interaction.data.resolved?.roles?.get(BigInt(option.value!)) as Role) ?? {
          user: interaction.data.resolved?.users?.get(BigInt(option.value!)) as User,
          member: interaction.data.resolved?.members?.get(BigInt(option.value!)) as InteractionResolvedMember,
        }
        break
      default:
        args[option.name] = option.value as ParsedInteractionOption[string]
    }
  }

  return args
}

export interface ParsedInteractionOption {
  [key: string]: string | number | boolean | InteractionResolvedUser | InteractionResolvedChannel | Role | Attachment | ParsedInteractionOption
}

export interface InteractionResolvedUser {
  user: User
  member: InteractionResolvedMember
}

export type InteractionResolvedChannel = Pick<Channel, 'id' | 'name' | 'type' | 'permissions' | 'threadMetadata' | 'parentId'>

export type InteractionResolvedMember = Omit<Member, 'user' | 'deaf' | 'mute'>
