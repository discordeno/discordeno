/*
 * This File will never run when you use it.
 * It is only meant for easy debugging/adding features to the library.
 * It allows me to easily run up a bot using the library itself without having to commit code
 * and then reloading cache from another bot folder to then test each micro change.
 * Especially since a lot of Deno is still unstable and we have to be able to adjust on the fly this is helpful.
 * Don't worry this will never run and you should never touch this file.
 * Review the official boilerplates to see how to start a bot!
 */

import Client from "./module/client.ts";
import { configs } from "./configs.ts";
import { Intents } from "./types/options.ts";
import { logYellow } from "./utils/logger.ts";
import { cache } from "./utils/cache.ts";
import { editBotsStatus } from "./utils/utils.ts";
import { StatusType } from "./types/discord.ts";
import { ActivityType } from "./types/activity.ts";

Client({
  token: configs.token,
  botID: "675412054529540107",
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES, Intents.GUILD_MEMBERS],
  eventHandlers: {
    ready: () => {
      logYellow("Bot ready emitted");
      editBotsStatus(
        StatusType.DoNotDisturb,
        "Testing Name DND",
        ActivityType.Listening,
      );
    },
    // raw: (data) => logGreen("[RAW] => " + JSON.stringify(data)),
    messageCreate: async (message) => {
      if (message.author.id === "130136895395987456") {
        if (message.content.startsWith("!test")) {
          if (!message.guild_id) return;
          const guild = cache.guilds.get(message.guild_id);
          if (!guild) return logYellow("no guild");
        }
      }
    },
  },
});
