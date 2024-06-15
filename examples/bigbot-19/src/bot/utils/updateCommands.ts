import { type CamelizedDiscordApplicationCommandOption, type CreateApplicationCommand, type CreateSlashApplicationCommand } from '@discordeno/bot'
import { createHash } from 'node:crypto'
import { DEVELOPMENT, DEV_SERVER_ID } from '../../config.js'
import { bot } from '../bot.js'
import type { Command } from '../commands.js'
import type { TranslationKey } from '../languages/languages.js'
import { loadLocale, translate } from '../languages/translate.js'
import prisma from '../prisma.js'

const commandCache = new Map<CreateApplicationCommand, CreateApplicationCommand>()

// TODO: add some comments in this file, it is currently quite hard to understand what is going on

export async function updateCommands(guildId: bigint): Promise<void> {
  bot.logger.info(`Updating commands for guildId ${guildId}`)

  await loadLocale(guildId)

  const userCommands = bot.commands
    .filter((x) => (guildId === BigInt(DEV_SERVER_ID ?? -1n) && DEVELOPMENT ? true : !x.devOnly))
    .array()
    .map((x) => translateCommands(guildId, x))

  await bot.helpers.upsertGuildApplicationCommands(guildId, userCommands)

  bot.logger.info(`Saving the command hash for guildId ${guildId}`)
  await prisma.guild.upsert({
    where: { guildId },
    create: { guildId, commands: currentCommandHash },
    update: { commands: currentCommandHash },
  })
}

let currentCommandHash: string

const guildCommandHashes = new Map<bigint, string>()

export async function usesLatestCommands(guildId: bigint): Promise<boolean> {
  const current = await getCurrentCommandHash(guildId)

  return current === currentCommandHash
}

export async function getCurrentCommandHash(guildId: bigint): Promise<string | null> {
  if (!currentCommandHash) {
    const serializedCommands = JSON.stringify(bot.commands.array())
    currentCommandHash = createHash('sha1').update(serializedCommands).digest('hex')
  }

  const cached = guildCommandHashes.get(guildId)

  if (cached) return cached

  const commandVersion = await prisma.guild.findFirst({ where: { guildId } })

  if (commandVersion?.commands) guildCommandHashes.set(guildId, commandVersion.commands)

  return commandVersion?.commands ?? null
}

function translateCommands(guildId: bigint, command: Command): CreateApplicationCommand {
  const cached = commandCache.get(command)

  if (cached) return cached

  // we don't want to modify the original command, so we transform it and copying it in the process
  const appCommand = transformCommand(command)

  appCommand.name = translate(guildId, appCommand.name as TranslationKey)
  if ('description' in appCommand) {
    appCommand.description = translate(guildId, appCommand.description as TranslationKey)

    if (appCommand.options) translateOptions(guildId, appCommand.options)
  }

  commandCache.set(command, appCommand)

  return appCommand
}

function translateOptions(guildId: bigint, options: CamelizedDiscordApplicationCommandOption[]): void {
  for (const option of options) {
    option.name = translate(guildId, option.name as TranslationKey)
    option.description = translate(guildId, option.description as TranslationKey)

    if (option.options) translateOptions(guildId, option.options)
  }
}

// Transform our custom Command object to the discordeno CreateApplicationCommand to avoid issues
function transformCommand(command: Command): CreateApplicationCommand {
  const discordPayload = {} as CreateApplicationCommand

  if (command.name) discordPayload.name = command.name
  if (command.defaultMemberPermissions) discordPayload.defaultMemberPermissions = command.defaultMemberPermissions
  if (command.dmPermission) discordPayload.dmPermission = command.dmPermission
  if (command.contexts) discordPayload.contexts = command.contexts
  if (command.integrationTypes) discordPayload.integrationTypes = command.integrationTypes
  if (command.nameLocalizations) discordPayload.nameLocalizations = command.nameLocalizations
  if (command.nsfw) discordPayload.nsfw = command.nsfw
  if (command.type) discordPayload.type = command.type

  if ('description' in command) {
    const payload = discordPayload as CreateSlashApplicationCommand

    if (command.description) payload.description = command.description
    if (command.descriptionLocalizations) payload.descriptionLocalizations = command.descriptionLocalizations
    if (command.options) payload.options = command.options
  }

  return discordPayload
}
