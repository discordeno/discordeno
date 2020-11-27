import { delay } from "https://deno.land/std@0.75.0/async/delay.ts";
import { Intents } from "./mod.ts";
import { addReaction } from "./src/handlers/message.ts";
import {
  joinVoiceChannel,
  sendVoice,
  setSpeaking,
} from "./src/handlers/voice.ts";
import { startBot } from "./src/module/client.ts";

startBot({
  token: "NzcxMDU2NzQzNTI1Nzc3NDM4.X5mkjQ.NrFOEXFpWX7NWQ-WPeaTmiWe7GE",
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES, Intents.GUILD_VOICE_STATES],
  eventHandlers: {
    ready: () => console.log("Successfully logged in"),
    messageCreate: async (message) => {
      if (message.content === "milo join") {
        const voiceChannel = "781956635382906900";
        await addReaction(message.channelID, message.id, "👍");
        await joinVoiceChannel(message.guildID, voiceChannel);
        await delay(5000);
        await setSpeaking(voiceChannel, true);
        await sendVoice(
          voiceChannel,
          new Uint8Array([0xf8, 0xff, 0xfe]),
        );
      }
    },
  },
});
