import type { ApplicationCommandOptionTypes, ChannelTypes, DiscordApplicationCommandOption, Localization } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { ApplicationCommandOptionChoice } from './applicationCommandOptionChoice.js'

export function transformApplicationCommandOption(bot: Bot, payload: DiscordApplicationCommandOption): ApplicationCommandOption {
  const applicationCommandOption = {
    type: payload.type,
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    description: payload.description,
    descriptionLocalizations: payload.description_localizations ?? undefined,
    required: payload.required ?? false,
    choices: payload.choices?.map((choice) => bot.transformers.applicationCommandOptionChoice(bot, choice)),
    autocomplete: payload.autocomplete,
    channelTypes: payload.channel_types,
    minValue: payload.min_value,
    maxValue: payload.max_value,
    minLength: payload.min_length,
    maxLength: payload.max_length,
    options: payload.options?.map((option) => bot.transformers.applicationCommandOption(bot, option)),
  } as ApplicationCommandOption

  return bot.transformers.customizers.applicationCommandOption(bot, payload, applicationCommandOption)
}

export interface ApplicationCommandOption {
  /** Value of Application Command Option Type */
  type: ApplicationCommandOptionTypes
  /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
  name: string
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localization
  /** 1-100 character description */
  description: string
  /** Localization object for the `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localization
  /** If the parameter is required or optional--default `false` */
  required?: boolean
  /** Choices for `string` and `int` types for the user to pick from */
  choices?: ApplicationCommandOptionChoice[]
  /** If the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: ApplicationCommandOption[]
  /** If the option is a channel type, the channels shown will be restricted to these types */
  channelTypes?: ChannelTypes[]
  /** Minimum number desired. */
  minValue?: number
  /** Maximum number desired. */
  maxValue?: number
  /** Minimum length desired. */
  minLength?: number
  /** Maximum length desired. */
  maxLength?: number
  /** if autocomplete interactions are enabled for this `String`, `Integer`, or `Number` type option */
  autocomplete?: boolean
}
