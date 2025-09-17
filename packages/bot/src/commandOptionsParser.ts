import { ApplicationCommandOptionTypes } from '@discordeno/types'
import type { CompleteDesiredProperties, DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from './desiredProperties.js'
import type { Attachment, Channel, Interaction, InteractionDataOption, Member, Role, User } from './transformers/types.js'

export function commandOptionsParser<
  TProps extends TransformersDesiredProperties & { interaction: { data: true } },
  TBehavior extends DesiredPropertiesBehavior,
>(__interaction: SetupDesiredProps<Interaction, TProps, TBehavior>, options?: InteractionDataOption[]): ParsedInteractionOption<TProps, TBehavior> {
  // This is necessary as typescript gets really confused when using __interaction alone, as it will say that 'data' does not exist despite it surely exist since we have the &
  const interaction = __interaction as SetupDesiredProps<
    Interaction,
    CompleteDesiredProperties<{ interaction: { data: true } }>,
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
  | InteractionResolvedDataUser<TProps, TBehavior>
  | InteractionResolvedDataChannel<TProps, TBehavior>
  | SetupDesiredProps<Role, TProps, TBehavior>
  | SetupDesiredProps<Attachment, TProps, TBehavior>
  | ParsedInteractionOption<TProps, TBehavior>

export interface InteractionResolvedDataUser<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> {
  user: SetupDesiredProps<User, TProps, TBehavior>
  member: InteractionResolvedDataMember<TProps, TBehavior>
}

export type InteractionResolvedDataChannel<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = Pick<
  SetupDesiredProps<Channel, TProps, TBehavior>,
  Extract<
    keyof SetupDesiredProps<Channel, TProps, TBehavior>,
    | 'id'
    | 'name'
    | 'type'
    | 'permissions'
    | 'lastMessageId'
    | 'lastPinTimestamp'
    | 'nsfw'
    | 'parentId'
    | 'guildId'
    | 'flags'
    | 'rateLimitPerUser'
    | 'topic'
    | 'position'
    | 'threadMetadata'
  >
>

export type InteractionResolvedDataMember<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = Omit<
  SetupDesiredProps<Member, TProps, TBehavior>,
  'user' | 'deaf' | 'mute'
>

/** @deprecated Use {@link InteractionResolvedDataUser} */
export interface InteractionResolvedUser {
  user: User
  member: InteractionResolvedMember
}

/** @deprecated Use {@link InteractionResolvedDataChannel} */
export type InteractionResolvedChannel = Pick<
  Channel,
  | 'id'
  | 'name'
  | 'type'
  | 'permissions'
  | 'lastMessageId'
  | 'lastPinTimestamp'
  | 'nsfw'
  | 'parentId'
  | 'guildId'
  | 'flags'
  | 'rateLimitPerUser'
  | 'topic'
  | 'position'
  | 'threadMetadata'
>

/** @deprecated Use {@link InteractionResolvedDataMember} */
export type InteractionResolvedMember = Omit<Member, 'user' | 'deaf' | 'mute'>
