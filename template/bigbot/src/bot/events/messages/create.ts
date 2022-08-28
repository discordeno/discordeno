import { bot } from "../../bot";
import { processMessageCollectors } from "../../utils/collectors";

export function setMessageCreateEvent() {
  bot.events.messageCreate = async function (_, message) {
    processMessageCollectors(message);
    
    await Promise.allSettled([
        // SETUP-DD-TEMP: Add any functions you want to run on every message here. For example, automoderation filters.
    ]).catch(console.log)
  };
}
