import { Intents } from "./mod.ts";
import { addReaction } from "./src/handlers/message.ts";
import { joinVoiceChannel } from "./src/handlers/voice.ts";
import { startBot } from "./src/module/client.ts";

startBot({
  token: "NzcxMDU2NzQzNTI1Nzc3NDM4.X5mkjQ.9PfMXrffJm9NYonrnnIR4WyGRho",
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES, Intents.GUILD_VOICE_STATES],
  eventHandlers: {
    ready: () => console.log("Successfully logged in"),
    messageCreate: async (message) => {
      if (message.content === "milo join") {
        await addReaction(message.channelID, message.id, "👍");
        await joinVoiceChannel(message.guildID, "781606036242694184");
      }
    },
  },
});
