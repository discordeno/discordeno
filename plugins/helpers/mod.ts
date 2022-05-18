import {
  ApplicationCommandOptionChoice,
  Bot,
  Channel,
  Collection,
  CreateMessage,
  FinalHelpers,
  ListGuildMembers,
  Member,
  Message,
} from "./deps.ts";
import { cloneChannel } from "./src/channels.ts";
import { sendAutocompleteChoices } from "./src/sendAutoCompleteChoices.ts";
import { sendDirectMessage } from "./src/sendDirectMessage.ts";
import { suppressEmbeds } from "./src/suppressEmbeds.ts";
import { archiveThread, editThread, lockThread, ModifyThread, unarchiveThread, unlockThread } from "./src/threads.ts";
import { disconnectMember } from "./src/disconnectMember.ts";
import { getMembersPaginated } from "./src/getMembersPaginated.ts";
import { moveMember } from "./src/moveMember.ts";
import { fetchAndRetrieveMembers } from "./src/fetchAndRetrieveMembers.ts";
import { BotWithCache } from "../cache/src/addCacheCollections.ts";
import { sendTextMessage } from "./src/sendTextMessage.ts";

export type BotWithHelpersPlugin<B extends Bot = Bot> = Omit<B, "helpers"> & HelperFunctionsFromHelperPlugin;

export interface HelperFunctionsFromHelperPlugin {
  helpers: FinalHelpers & {
    fetchAndRetrieveMembers: (
      guildId: bigint,
    ) => Promise<Collection<bigint, Member>>;
    sendDirectMessage: (
      userId: bigint,
      content: string | CreateMessage,
    ) => Promise<Message>;
    sendTextMessage: (
      channelId: bigint,
      content: string | CreateMessage,
    ) => Promise<Message>;
    suppressEmbeds: (
      channelId: bigint,
      messageId: bigint,
    ) => Promise<Message>;
    archiveThread: (threadId: bigint) => Promise<Channel>;
    unarchiveThread: (threadId: bigint) => Promise<Channel>;
    lockThread: (threadId: bigint) => Promise<Channel>;
    unlockThread: (threadId: bigint) => Promise<Channel>;
    editThread: (
      threadId: bigint,
      options: ModifyThread,
      reason?: string,
    ) => Promise<Channel>;
    cloneChannel: (
      channel: Channel,
      reason?: string,
    ) => Promise<Channel>;
    sendAutocompleteChoices: (
      interactionId: bigint,
      interactionToken: string,
      choices: ApplicationCommandOptionChoice[],
    ) => Promise<void>;
    disconnectMember: (
      guildId: bigint,
      memberId: bigint,
    ) => Promise<Member>;
    getMembersPaginated: (
      guildId: bigint,
      options: ListGuildMembers,
    ) => Promise<Collection<bigint, Member>>;
    moveMember: (
      guildId: bigint,
      memberId: bigint,
      channelId: bigint,
    ) => Promise<Member>;
  };
}

export function enableHelpersPlugin<B extends Bot = Bot>(rawBot: B): BotWithHelpersPlugin<B> {
  // FORCE OVERRIDE THE TYPE SO WE CAN SETUP FUNCTIONS
  const bot = rawBot as unknown as BotWithHelpersPlugin;

  bot.helpers.fetchAndRetrieveMembers = (
    guildId: bigint,
  ) => fetchAndRetrieveMembers(bot as unknown as BotWithCache, guildId);
  bot.helpers.sendDirectMessage = (
    userId: bigint,
    content: string | CreateMessage,
  ) => sendDirectMessage(bot, userId, content);
  bot.helpers.sendTextMessage = (
    channelId: bigint,
    content: string | CreateMessage,
  ) => sendTextMessage(bot, channelId, content);
  bot.helpers.suppressEmbeds = (channelId: bigint, messageId: bigint) => suppressEmbeds(bot, channelId, messageId);
  bot.helpers.archiveThread = (threadId: bigint) => archiveThread(bot, threadId);
  bot.helpers.unarchiveThread = (threadId: bigint) => unarchiveThread(bot, threadId);
  bot.helpers.lockThread = (threadId: bigint) => lockThread(bot, threadId);
  bot.helpers.unlockThread = (threadId: bigint) => unlockThread(bot, threadId);
  bot.helpers.editThread = (
    threadId: bigint,
    options: ModifyThread,
    reason?: string,
  ) => editThread(bot, threadId, options, reason);
  bot.helpers.cloneChannel = (channel: Channel, reason?: string) => cloneChannel(bot, channel, reason);
  bot.helpers.sendAutocompleteChoices = (
    interactionId: bigint,
    interactionToken: string,
    choices: ApplicationCommandOptionChoice[],
  ) => sendAutocompleteChoices(bot, interactionId, interactionToken, choices);
  bot.helpers.disconnectMember = (guildId: bigint, memberId: bigint) => disconnectMember(bot, guildId, memberId);
  bot.helpers.getMembersPaginated = (
    guildId: bigint,
    options: ListGuildMembers,
  ) => getMembersPaginated(bot, guildId, options);
  bot.helpers.moveMember = (
    guildId: bigint,
    memberId: bigint,
    channelId: bigint,
  ) => moveMember(bot, guildId, memberId, channelId);

  return bot as BotWithHelpersPlugin<B>;
}

// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
export * from "./src/channels.ts";
export * from "./src/disconnectMember.ts";
export * from "./src/getMembersPaginated.ts";
export * from "./src/moveMember.ts";
export * from "./src/sendAutoCompleteChoices.ts";
export * from "./src/sendDirectMessage.ts";
export * from "./src/sendPrivateInteractionResponse.ts";
export * from "./src/suppressEmbeds.ts";
export * from "./src/threads.ts";
export default enableHelpersPlugin;
