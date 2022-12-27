import type {
  ApplicationCommandOptionChoice,
  BigString,
  Bot,
  Channel,
  Collection,
  CreateMessage,
  FinalHelpers,
  InteractionResponse,
  ListGuildMembers,
  Member,
  Message
} from 'discordeno'
import type { BotWithCache } from '../cache/src/addCacheCollections.js'
import { cloneChannel } from './src/channels.js'
import { disconnectMember } from './src/disconnectMember.js'
import { fetchAndRetrieveMembers } from './src/fetchAndRetrieveMembers.js'
import { getMembersPaginated } from './src/getMembersPaginated.js'
import { moveMember } from './src/moveMember.js'
import { sendAutocompleteChoices } from './src/sendAutoCompleteChoices.js'
import { sendDirectMessage } from './src/sendDirectMessage.js'
import { sendPrivateInteractionResponse } from './src/sendPrivateInteractionResponse.js'
import { sendTextMessage } from './src/sendTextMessage.js'
import { suppressEmbeds } from './src/suppressEmbeds.js'
import type { ModifyThread } from './src/threads.js'
import {
  archiveThread,
  editThread,
  lockThread,
  unarchiveThread,
  unlockThread
} from './src/threads.js'

export type BotWithUtilsPlugin<B extends Bot = Bot> = Omit<B, 'helpers'> &
HelperFunctionsFromHelperPlugin

export interface HelperFunctionsFromHelperPlugin {
  helpers: FinalHelpers & {
    fetchAndRetrieveMembers: (
      guildId: BigString
    ) => Promise<Collection<bigint, Member>>
    sendDirectMessage: (
      userId: BigString,
      content: string | CreateMessage
    ) => Promise<Message>
    sendTextMessage: (
      channelId: BigString,
      content: string | CreateMessage
    ) => Promise<Message>
    sendPrivateInteractionResponse: (
      id: BigString,
      token: string,
      options: InteractionResponse
    ) => Promise<void>
    suppressEmbeds: (
      channelId: BigString,
      messageId: BigString
    ) => Promise<Message>
    archiveThread: (threadId: BigString) => Promise<Channel>
    unarchiveThread: (threadId: BigString) => Promise<Channel>
    lockThread: (threadId: BigString) => Promise<Channel>
    unlockThread: (threadId: BigString) => Promise<Channel>
    editThread: (
      threadId: BigString,
      options: ModifyThread,
      reason?: string
    ) => Promise<Channel>
    cloneChannel: (channel: Channel, reason?: string) => Promise<Channel>
    sendAutocompleteChoices: (
      interactionId: BigString,
      interactionToken: string,
      choices: ApplicationCommandOptionChoice[]
    ) => Promise<void>
    disconnectMember: (
      guildId: BigString,
      memberId: BigString
    ) => Promise<Member>
    getMembersPaginated: (
      guildId: BigString,
      options: ListGuildMembers
    ) => Promise<Collection<bigint, Member>>
    moveMember: (
      guildId: BigString,
      memberId: BigString,
      channelId: BigString
    ) => Promise<Member>
  }
}

export function enableUtilsPlugin<B extends Bot = Bot> (
  rawBot: B
): BotWithUtilsPlugin<B> {
  // FORCE OVERRIDE THE TYPE SO WE CAN SETUP FUNCTIONS
  const bot = rawBot as unknown as BotWithUtilsPlugin

  bot.helpers.fetchAndRetrieveMembers = async (guildId: BigString) =>
    await fetchAndRetrieveMembers(bot as unknown as BotWithCache, guildId)
  bot.helpers.sendDirectMessage = async (
    userId: BigString,
    content: string | CreateMessage
  ) => await sendDirectMessage(bot, userId, content)
  bot.helpers.sendTextMessage = async (
    channelId: BigString,
    content: string | CreateMessage
  ) => await sendTextMessage(bot, channelId, content)
  bot.helpers.sendPrivateInteractionResponse = async (
    id: BigString,
    token: string,
    options: InteractionResponse
  ) => await sendPrivateInteractionResponse(bot, id, token, options)
  bot.helpers.suppressEmbeds = async (
    channelId: BigString,
    messageId: BigString
  ) => await suppressEmbeds(bot, channelId, messageId)
  bot.helpers.archiveThread = async (threadId: BigString) =>
    await archiveThread(bot, threadId)
  bot.helpers.unarchiveThread = async (threadId: BigString) =>
    await unarchiveThread(bot, threadId)
  bot.helpers.lockThread = async (threadId: BigString) =>
    await lockThread(bot, threadId)
  bot.helpers.unlockThread = async (threadId: BigString) =>
    await unlockThread(bot, threadId)
  bot.helpers.editThread = async (
    threadId: BigString,
    options: ModifyThread,
    reason?: string
  ) => await editThread(bot, threadId, options, reason)
  bot.helpers.cloneChannel = async (channel: Channel, reason?: string) =>
    await cloneChannel(bot, channel, reason)
  bot.helpers.sendAutocompleteChoices = async (
    interactionId: BigString,
    interactionToken: string,
    choices: ApplicationCommandOptionChoice[]
  ) =>
    await sendAutocompleteChoices(
      bot,
      interactionId,
      interactionToken,
      choices
    )
  bot.helpers.disconnectMember = async (
    guildId: BigString,
    memberId: BigString
  ) => await disconnectMember(bot, guildId, memberId)
  bot.helpers.getMembersPaginated = async (
    guildId: BigString,
    options: ListGuildMembers
  ) => await getMembersPaginated(bot, guildId, options)
  bot.helpers.moveMember = async (
    guildId: BigString,
    memberId: BigString,
    channelId: BigString
  ) => await moveMember(bot, guildId, memberId, channelId)

  return bot as BotWithUtilsPlugin<B>
}

// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
export * from './src/channels.js'
export * from './src/disconnectMember.js'
export * from './src/fetchAndRetrieveMembers.js'
export * from './src/getMembersPaginated.js'
export * from './src/moveMember.js'
export * from './src/sendAutoCompleteChoices.js'
export * from './src/sendDirectMessage.js'
export * from './src/sendPrivateInteractionResponse.js'
export * from './src/sendTextMessage.js'
export * from './src/suppressEmbeds.js'
export * from './src/threads.js'
export default enableUtilsPlugin
