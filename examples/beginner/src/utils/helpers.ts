import { hasProperty, type Bot, type CreateApplicationCommand, type Guild } from '@discordeno/bot'
import { bot } from '../bot.js'
import { commands, type SubCommand, type SubCommandGroup } from '../commands.js'
import { createLogger } from './logger.js'

const logger = createLogger({ name: 'Helpers' })

/** This function will update all commands, or the defined scope */
export async function updateCommands(scope?: 'Guild' | 'Global'): Promise<void> {
  const globalCommands: Array<MakeRequired<CreateApplicationCommand, 'name'>> = []
  const perGuildCommands: Array<MakeRequired<CreateApplicationCommand, 'name'>> = []

  for (const command of commands.values()) {
    if (command.scope) {
      if (command.scope === 'Guild') {
        perGuildCommands.push({
          name: command.name,
          description: command.description,
          type: command.type,
          options: command.options ? command.options : undefined,
        })
      } else if (command.scope === 'Global') {
        globalCommands.push({
          name: command.name,
          description: command.description,
          type: command.type,
          options: command.options ? command.options : undefined,
        })
      }
    } else {
      perGuildCommands.push({
        name: command.name,
        description: command.description,
        type: command.type,
        options: command.options ? command.options : undefined,
      })
    }
  }

  if (globalCommands.length && (scope === 'Global' || scope === undefined)) {
    logger.info('Updating Global Commands, changes should apply in short...')
    await bot.helpers.upsertGlobalApplicationCommands(globalCommands).catch(logger.error)
  }

  if (perGuildCommands.length && (scope === 'Guild' || scope === undefined)) {
    await Promise.all(
      bot.cache.guilds.memory.map(async (guild: Guild) => {
        await bot.helpers.upsertGuildApplicationCommands(guild.id, perGuildCommands)
      }),
    )
  }
}

/** Update commands for a guild */
export async function updateGuildCommands(bot: Bot, guild: Guild): Promise<void> {
  const perGuildCommands: Array<MakeRequired<CreateApplicationCommand, 'name'>> = []

  for (const command of commands.values()) {
    if (command.scope) {
      if (command.scope === 'Guild') {
        perGuildCommands.push({
          name: command.name,
          description: command.description,
          type: command.type,
          options: command.options ? command.options : undefined,
        })
      }
    }
  }

  if (perGuildCommands.length) {
    await bot.helpers.upsertGuildApplicationCommands(guild.id, perGuildCommands)
  }
}

export async function getGuildFromId(guildId: bigint): Promise<Guild> {
  const cached = await bot.cache.guilds.get(guildId)

  if (cached) return cached

  return await bot.helpers.getGuild(guildId)
}

export function humanizeMilliseconds(milliseconds: number): string {
  // Gets ms into seconds
  const time = milliseconds / 1000
  if (time < 1) return '1s'

  const days = Math.floor(time / 86400)
  const hours = Math.floor((time % 86400) / 3600)
  const minutes = Math.floor(((time % 86400) % 3600) / 60)
  const seconds = Math.floor(((time % 86400) % 3600) % 60)

  const dayString = days ? `${days}d ` : ''
  const hourString = hours ? `${hours}h ` : ''
  const minuteString = minutes ? `${minutes}m ` : ''
  const secondString = seconds ? `${seconds}s ` : ''

  return `${dayString}${hourString}${minuteString}${secondString}`
}

export function isSubCommand(data: SubCommand | SubCommandGroup): data is SubCommand {
  return !hasProperty(data, 'subCommands')
}

export function isSubCommandGroup(data: SubCommand | SubCommandGroup): data is SubCommandGroup {
  return hasProperty(data, 'subCommands')
}

type MakeRequired<TObj, TKey extends keyof TObj> = TObj & {
  [Key in TKey]-?: TObj[Key]
}
