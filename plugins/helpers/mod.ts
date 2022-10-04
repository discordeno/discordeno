import { BotWithCache } from "../cache/src/addCacheCollections.ts";
import {
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
  Message,
} from "./deps.ts";
import { cloneChannel } from "./src/channels.ts";
import { disconnectMember } from "./src/disconnectMember.ts";
import { fetchAndRetrieveMembers } from "./src/fetchAndRetrieveMembers.ts";
import { getMembersPaginated } from "./src/getMembersPaginated.ts";
import { moveMember } from "./src/moveMember.ts";
import { sendAutocompleteChoices } from "./src/sendAutoCompleteChoices.ts";
import { sendDirectMessage } from "./src/sendDirectMessage.ts";
import { sendPrivateInteractionResponse } from "./src/sendPrivateInteractionResponse.ts";
import { sendTextMessage } from "./src/sendTextMessage.ts";
import { suppressEmbeds } from "./src/suppressEmbeds.ts";
import { archiveThread, editThread, lockThread, ModifyThread, unarchiveThread, unlockThread } from "./src/threads.ts";

export type BotWithHelpersPlugin<B extends Bot = Bot> = Omit<B, "helpers"> & HelperFunctionsFromHelperPlugin;

export interface HelperFunctionsFromHelperPlugin {
  helpers: FinalHelpers & {
    fetchAndRetrieveMembers: (guildId: BigString) => Promise<Collection<bigint, Member>>;
    sendDirectMessage: (userId: BigString, content: string | CreateMessage) => Promise<Message>;
    sendTextMessage: (channelId: BigString, content: string | CreateMessage) => Promise<Message>;
    sendPrivateInteractionResponse: (
      id: BigString,
      token: string,
      options: InteractionResponse,
    ) => Promise<void>;
    suppressEmbeds: (channelId: BigString, messageId: BigString) => Promise<Message>;
    archiveThread: (threadId: BigString) => Promise<Channel>;
    unarchiveThread: (threadId: BigString) => Promise<Channel>;
    lockThread: (threadId: BigString) => Promise<Channel>;
    unlockThread: (threadId: BigString) => Promise<Channel>;
    editThread: (threadId: BigString, options: ModifyThread, reason?: string) => Promise<Channel>;
    cloneChannel: (channel: Channel, reason?: string) => Promise<Channel>;
    sendAutocompleteChoices: (
      interactionId: BigString,
      interactionToken: string,
      choices: ApplicationCommandOptionChoice[],
    ) => Promise<void>;
    disconnectMember: (guildId: BigString, memberId: BigString) => Promise<Member>;
    getMembersPaginated: (guildId: BigString, options: ListGuildMembers) => Promise<Collection<bigint, Member>>;
    moveMember: (guildId: BigString, memberId: BigString, channelId: BigString) => Promise<Member>;
  };
}

export function enableHelpersPlugin<B extends Bot = Bot>(rawBot: B): BotWithHelpersPlugin<B> {
  // FORCE OVERRIDE THE TYPE SO WE CAN SETUP FUNCTIONS
  const bot = rawBot as unknown as BotWithHelpersPlugin;

  bot.helpers.fetchAndRetrieveMembers = (guildId: BigString) =>
    fetchAndRetrieveMembers(bot as unknown as BotWithCache, guildId);
  bot.helpers.sendDirectMessage = (userId: BigString, content: string | CreateMessage) =>
    sendDirectMessage(bot, userId, content);
  bot.helpers.sendTextMessage = (channelId: BigString, content: string | CreateMessage) =>
    sendTextMessage(bot, channelId, content);
  bot.helpers.sendPrivateInteractionResponse = (id: BigString, token: string, options: InteractionResponse) =>
    sendPrivateInteractionResponse(bot, id, token, options);
  bot.helpers.suppressEmbeds = (channelId: BigString, messageId: BigString) =>
    suppressEmbeds(bot, channelId, messageId);
  bot.helpers.archiveThread = (threadId: BigString) => archiveThread(bot, threadId);
  bot.helpers.unarchiveThread = (threadId: BigString) => unarchiveThread(bot, threadId);
  bot.helpers.lockThread = (threadId: BigString) => lockThread(bot, threadId);
  bot.helpers.unlockThread = (threadId: BigString) => unlockThread(bot, threadId);
  bot.helpers.editThread = (threadId: BigString, options: ModifyThread, reason?: string) =>
    editThread(bot, threadId, options, reason);
  bot.helpers.cloneChannel = (channel: Channel, reason?: string) => cloneChannel(bot, channel, reason);
  bot.helpers.sendAutocompleteChoices = (
    interactionId: BigString,
    interactionToken: string,
    choices: ApplicationCommandOptionChoice[],
  ) => sendAutocompleteChoices(bot, interactionId, interactionToken, choices);
  bot.helpers.disconnectMember = (guildId: BigString, memberId: BigString) => disconnectMember(bot, guildId, memberId);
  bot.helpers.getMembersPaginated = (guildId: BigString, options: ListGuildMembers) =>
    getMembersPaginated(bot, guildId, options);
  bot.helpers.moveMember = (guildId: BigString, memberId: BigString, channelId: BigString) =>
    moveMember(bot, guildId, memberId, channelId);

  return bot as BotWithHelpersPlugin<B>;
}

// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
export * from "./src/channels.ts";
export * from "./src/disconnectMember.ts";
export * from "./src/fetchAndRetrieveMembers.ts";
export * from "./src/getMembersPaginated.ts";
export * from "./src/moveMember.ts";
export * from "./src/sendAutoCompleteChoices.ts";
export * from "./src/sendDirectMessage.ts";
export * from "./src/sendPrivateInteractionResponse.ts";
export * from "./src/sendTextMessage.ts";
export * from "./src/suppressEmbeds.ts";
export * from "./src/threads.ts";
export default enableHelpersPlugin;
