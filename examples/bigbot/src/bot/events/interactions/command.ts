import { bgBlack, bgGreen, bgMagenta, bgYellow, black, green, red, white } from 'colorette'
import type {
  ApplicationCommandOption,
  Bot,
  Channel,
  ChannelTypes,
  Interaction,
  InteractionDataOption,
  Member,
  Message,
  Role,
  User,
} from 'discordeno'
import { ApplicationCommandOptionTypes, InteractionResponseTypes } from 'discordeno'
import type { BotWithCustomProps } from '../../bot.js'
import { bot } from '../../bot.js'
import COMMANDS from '../../commands/mod.js'
import type { translationKeys } from '../../languages/translate.js'
import { getLanguage, loadLanguage, serverLanguages, translate } from '../../languages/translate.js'
import type { InteractionWithCustomProps } from '../../typings/discordeno.js'
import type { Command, ConvertArgumentDefinitionsToArgs } from '../../utils/slash/createCommand.js'

function logCommand(
  info: Interaction,
  type: 'Failure' | 'Success' | 'Trigger' | 'Slowmode' | 'Missing' | 'Inhibit',
  commandName: string,
): void {
  const command = `[COMMAND: ${bgYellow(black(commandName || 'Unknown'))} - ${bgBlack(
    ['Failure', 'Slowmode', 'Missing'].includes(type) ? red(type) : type === 'Success' ? green(type) : white(type),
  )}]`

  const user = bgGreen(
    black(`${info.user.username}#${info.user.discriminator.toString().padStart(4, '0')}(${info.id})`),
  )
  const guild = bgMagenta(black(`${info.guildId ? `Guild ID: (${info.guildId})` : 'DM'}`))

  bot.logger.info(`${command} by ${user} in ${guild} with MessageID: ${info.id}`)
}

export async function executeSlashCommand(
  bot: BotWithCustomProps,
  interaction: InteractionWithCustomProps,
): Promise<Message | void> {
  const data = interaction.data
  const name = data?.name as keyof typeof COMMANDS

  const command: Command<any> | undefined = COMMANDS[name]

  // Command could not be found
  if (!command?.execute) {
    return await interaction.reply(translate(interaction.guildId!, 'EXECUTE_COMMAND_NOT_FOUND')).catch(bot.logger.error)
  }

  // HAVE TO CONVERT OUTSIDE OF TRY SO IT CAN BE USED IN CATCH TOO
  try {
    logCommand(interaction, 'Trigger', name)

    // Check subcommand permissions and options
    if (!(await commandAllowed(interaction, command))) return

    // Load the language for this guild
    if (interaction.guildId && !serverLanguages.has(interaction.guildId)) {
      // Todo: make command.execute reply change to editReply after running this
      // await interaction.reply({
      //   type: InteractionResponseTypes.DeferredChannelMessageWithSource,
      // });
      await loadLanguage(interaction.guildId)
    } // Load the language for this guild
    else if (command.acknowledge) {
      // Acknowledge the command
      await interaction.reply({
        type: InteractionResponseTypes.DeferredChannelMessageWithSource,
      })
    }

    // FIRST GET THE TRANSLATIONS FOR ALL OPTIONS
    const translatedOptionNames =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      interaction.guildId && command.options ? translateOptionNames(bot, interaction.guildId, command.options) : {}

    // PARSE THE OPTIONS TO A NICE OBJECT AND TRANSLATE THE KEYS TO ENGLISH
    const parsedArguments = optionParser(interaction, translatedOptionNames)

    await command.execute(bot, interaction, parsedArguments as ConvertArgumentDefinitionsToArgs<any>)
    logCommand(interaction, 'Success', name)
  } catch (error) {
    console.error(error)
    logCommand(interaction, 'Failure', name)

    try {
      console.log('try')
      // try to reply the interaction, becuase we don't know if it replied or deffered
      return await interaction.reply(translate(interaction.id, 'EXECUTE_COMMAND_ERROR'))
    } catch {
      console.log('catch')
      // edit the reply or deffered reply of interaction
      return await interaction.editReply(translate(interaction.id, 'EXECUTE_COMMAND_ERROR')).catch(bot.logger.error)
    }
  }
}

/** Runs the inhibitors to see if a command is allowed to run. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function commandAllowed(interaction: InteractionWithCustomProps, command: Command<any>) {
  // CHECK WHETHER THE USER/GUILD IS VIP
  if (command.vipOnly) {
    // SETUP-DD-TEMP: Check if this server/user is a vip.
    const isVIP = true

    if (!isVIP) {
      await interaction.reply(translate(interaction.id, 'NEED_VIP')).catch(bot.logger.error)

      return false
    }
  }

  return true
}

// Mapped by `language-commandName`
const translatedOptionNamesCache = new Map<string, Record<string, string>>()

/** Translates all options of the command to an object: translatedOptionName: optionName */
export function translateOptionNames(
  bot: Bot,
  guildId: bigint,
  options: ApplicationCommandOption[],
  commandName?: string,
): Record<string, string> {
  const language = getLanguage(guildId)
  // RETURN THE ALREADY TRANSLATED OPTIONS WHICH ARE IN CACHE
  if (commandName && translatedOptionNamesCache.has(`${language}-${commandName}`)) {
    return translatedOptionNamesCache.get(`${language}-${commandName}`)!
  }

  // TRANSLATE ALL OPTIONS
  let translated: Record<string, string> = {}
  for (const option of options) {
    translated[translate(guildId, option.name as translationKeys).toLowerCase()] = translate(
      'english',
      option.name as translationKeys,
    )
    if (option.options) {
      translated = {
        ...translated,
        ...translateOptionNames(bot, guildId, option.options),
      }
    }
  }

  // SAVE THE TRANSLATED OPTIONS IN CACHE FOR FASTER ACCESS
  if (commandName) {
    translatedOptionNamesCache.set(`${language}-${commandName}`, translated)
  }

  return translated
}

function convertOptionValue(
  interaction: Interaction,
  option: InteractionDataOption,
  translateOptions?: Record<string, string>,
): [
  string,
  (
    | { user: User; member: Member }
    | Role
    | {
        id: bigint
        name: string
        type: ChannelTypes
        permissions: bigint
      }
    | boolean
    | string
    | number
  ),
] {
  // THE OPTION IS A CHANNEL
  if (option.type === ApplicationCommandOptionTypes.Channel) {
    const channel = interaction.data?.resolved?.channels?.get(BigInt(option.value as string))

    // SAVE THE ARGUMENT WITH THE CORRECT NAME
    // @ts-expect-error the channel is going to have the right type
    return [translateOptions?.[option.name] ?? option.name, channel]
  }

  // THE OPTION IS A ROLE
  if (option.type === ApplicationCommandOptionTypes.Role) {
    const role = interaction.data?.resolved?.roles?.get(BigInt(option.value as string))

    // SAVE THE ARGUMENT WITH THE CORRECT NAME
    // @ts-expect-error the role is going to have the right type
    return [translateOptions?.[option.name] ?? option.name, role]
  }

  // THE OPTION IS A USER
  if (option.type === ApplicationCommandOptionTypes.User) {
    const user = interaction.data?.resolved?.users?.get(BigInt(option.value as string))
    const member = interaction.data?.resolved?.members?.get(BigInt(option.value as string))

    // SAVE THE ARGUMENT WITH THE CORRECT NAME
    return [
      translateOptions?.[option.name] ?? option.name,
      {
        // @ts-expect-error the member is going to have the right type
        member,
        // @ts-expect-error the user is going to have the right type
        user,
      },
    ]
  }

  // THE OPTION IS A MENTIONABLE
  if (option.type === ApplicationCommandOptionTypes.Mentionable) {
    const role = interaction.data?.resolved?.roles?.get(BigInt(option.value as string))
    const user = interaction.data?.resolved?.users?.get(BigInt(option.value as string))
    const member = interaction.data?.resolved?.members?.get(BigInt(option.value as string))

    const final = user && member ? { user, member } : role

    // SAVE THE ARGUMENT WITH THE CORRECT NAME
    // @ts-expect-error the final is going to have the right type
    return [translateOptions?.[option.name] ?? option.name, final]
  }

  // THE REST OF OPTIONS DON'T NEED ANY CONVERTION
  // SAVE THE ARGUMENT WITH THE CORRECT NAME
  // @ts-expect-error the option.value is going to have the right type
  return [translateOptions?.[option.name] ?? option.name, option.value]
}

/** Parse the options to a nice object.
 * NOTE: this does not work with subcommands
 */
export function optionParser(
  interaction: Interaction,
  translateOptions?: Record<string, string>,
):
  | InteractionCommandArgs
  | Record<string, InteractionCommandArgs>
  | Record<string, Record<string, InteractionCommandArgs>> {
  // OPTIONS CAN BE UNDEFINED SO WE JUST RETURN AN EMPTY OBJECT
  if (!interaction.data?.options) return {}

  // A SUBCOMMAND WAS USED
  if (interaction.data.options[0]?.type === ApplicationCommandOptionTypes.SubCommand) {
    const convertedOptions: Record<
      string,
      | { user: User; member: Member }
      | Role
      | {
          id: bigint
          name: string
          type: ChannelTypes
          permissions: bigint
        }
      | boolean
      | string
      | number
    > = {}
    // CONVERT ALL THE OPTIONS
    for (const option of interaction.data.options[0].options ?? []) {
      const [name, value] = convertOptionValue(interaction, option, translateOptions)
      convertedOptions[name] = value
    }

    // @ts-expect-error the return is going to have the right type
    return {
      [translateOptions?.[interaction.data.options[0].name] ?? interaction.data.options[0].name]: convertedOptions,
    }
  }

  // A SUBCOMMAND GROUP WAS USED
  if (interaction.data.options[0]?.type === ApplicationCommandOptionTypes.SubCommandGroup) {
    const convertedOptions: Record<string, Member | Role | Channel | boolean | string | number> = {}
    // CONVERT ALL THE OPTIONS
    for (const option of interaction.data.options[0]?.options![0]?.options ?? []) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const [name, value] = convertOptionValue(interaction, option, translateOptions)
      // @ts-expect-error The type is going to be right
      convertedOptions[name] = value
    }

    // @ts-expect-error The type is going to be right
    return {
      [translateOptions?.[interaction.data.options[0].name] ?? interaction.data.options[0].name]: {
        [translateOptions?.[interaction.data.options[0].options![0].name] ??
        interaction.data.options[0].options![0].name]: convertedOptions,
      },
    }
  }

  // A NORMAL COMMAND WAS USED
  const convertedOptions: Record<
    string,
    Member | Role | Record<string, Pick<Channel, 'id' | 'name' | 'type' | 'permissions'>> | boolean | string | number
  > = {}
  for (const option of interaction.data.options ?? []) {
    const [name, value] = convertOptionValue(interaction, option, translateOptions)
    // @ts-expect-error The type is going to be right
    convertedOptions[name] = value
  }

  return convertedOptions
}

/** The interaction arguments.
 * Important the members `deaf` and `mute` properties will always be false.
 */
export type InteractionCommandArgs = Record<
  string,
  Member | Role | Record<string, Pick<Channel, 'id' | 'name' | 'type' | 'permissions'>> | boolean | string | number
>
