import { Bot } from "./deps.ts";

export type BotWithGamerPlugin<B extends Bot = Bot> = B & GamerPlugin;

export interface GamerPlugin {

}

export function enableGamersPlugin<B extends Bot = Bot>(rawBot: B): BotWithGamerPlugin<B> {
  // FORCE OVERRIDE THE TYPE SO WE CAN SETUP FUNCTIONS
  const bot = rawBot as unknown as BotWithGamerPlugin;

  return bot as BotWithGamerPlugin<B>;
}

// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
export default enableGamersPlugin;
