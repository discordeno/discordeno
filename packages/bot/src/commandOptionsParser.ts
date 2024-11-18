import { ApplicationCommandOptionTypes } from '@discordeno/types'
import type {
  Attachment,
  Channel,
  DesiredPropertiesBehavior,
  Interaction,
  InteractionDataOption,
  Member,
  Role,
  SetupDesiredProps,
  TransformersDesiredProperties,
  User,
  WithAtLeast,
} from './index.js'

export function commandOptionsParser<
  TProps extends WithAtLeast<TransformersDesiredProperties, { interaction: { data: true } }>,
  TBehavior extends DesiredPropertiesBehavior,
>(__interaction: SetupDesiredProps<Interaction, TProps, TBehavior>, options?: InteractionDataOption[]): ParsedInteractionOption<TProps, TBehavior> {
  // This is necessary as typescript gets really confused when using __interaction alone, as it will say that 'data' does not exist despite it surely exist since we have the WithAtLeast
  const interaction = __interaction as SetupDesiredProps<
    Interaction,
    WithAtLeast<TransformersDesiredProperties, { interaction: { data: true } }>,
    DesiredPropertiesBehavior.RemoveKey
  >

  if (!interaction.data) return {}
  if (!options) options = interaction.data.options ?? []

  const args: ParsedInteractionOption<TProps, TBehavior> = {}

  for (const option of options) {
    switch (option.type) {
      case ApplicationCommandOptionTypes.SubCommandGroup:
      case ApplicationCommandOptionTypes.SubCommand:
        args[option.name] = commandOptionsParser(interaction, option.options) as InteractionResolvedData<TProps, TBehavior>
        break
      case ApplicationCommandOptionTypes.Channel:
        args[option.name] = interaction.data.resolved?.channels?.get(BigInt(option.value!)) as InteractionResolvedData<TProps, TBehavior>
        break
      case ApplicationCommandOptionTypes.Role:
        args[option.name] = interaction.data.resolved?.roles?.get(BigInt(option.value!)) as InteractionResolvedData<TProps, TBehavior>
        break
      case ApplicationCommandOptionTypes.User:
        args[option.name] = {
          user: interaction.data.resolved?.users?.get(BigInt(option.value!)) as InteractionResolvedData<TProps, TBehavior>,
          member: interaction.data.resolved?.members?.get(BigInt(option.value!)) as InteractionResolvedData<TProps, TBehavior>,
        }
        break
      case ApplicationCommandOptionTypes.Attachment:
        args[option.name] = interaction.data.resolved?.attachments?.get(BigInt(option.value!)) as InteractionResolvedData<TProps, TBehavior>
        break
      case ApplicationCommandOptionTypes.Mentionable:
        // Mentionable are roles or users
        args[option.name] = (interaction.data.resolved?.roles?.get(BigInt(option.value!)) as ParsedInteractionOption<TProps, TBehavior>[string]) ?? {
          user: interaction.data.resolved?.users?.get(BigInt(option.value!)) as InteractionResolvedData<TProps, TBehavior>,
          member: interaction.data.resolved?.members?.get(BigInt(option.value!)) as InteractionResolvedData<TProps, TBehavior>,
        }
        break
      default:
        args[option.name] = option.value as InteractionResolvedData<TProps, TBehavior>
    }
  }

  return args
}

export interface ParsedInteractionOption<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> {
  [key: string]: InteractionResolvedData<TProps, TBehavior>
}

export type InteractionResolvedData<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> =
  | string
  | number
  | boolean
  | InteractionResolvedUser<TProps, TBehavior>
  | InteractionResolvedChannel<TProps, TBehavior>
  | SetupDesiredProps<Role, TProps, TBehavior>
  | SetupDesiredProps<Attachment, TProps, TBehavior>
  | ParsedInteractionOption<TProps, TBehavior>

export interface InteractionResolvedUser<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> {
  user: SetupDesiredProps<User, TProps, TBehavior>
  member: InteractionResolvedMember<TProps, TBehavior>
}

export type InteractionResolvedChannel<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = Omit<
  SetupDesiredProps<Channel, TProps, TBehavior>,
  Exclude<keyof Channel, 'id' | 'name' | 'type' | 'permissions' | 'threadMetadata' | 'parentId'>
>

export type InteractionResolvedMember<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = Omit<
  SetupDesiredProps<Member, TProps, TBehavior>,
  'user' | 'deaf' | 'mute'
>
