import { bot } from "../../bot.js";
import { processMessageCollectors } from "../../utils/collectors.js";

export function setMessageCreateEvent() {
  bot.events.messageCreate = async function (_, message) {
    processMessageCollectors(message);
    console.log(message);
    await Promise.allSettled([
      // SETUP-DD-TEMP: Add any functions you want to run on every message here. For example, automoderation filters.
    ]).catch(console.log);
  };
}
