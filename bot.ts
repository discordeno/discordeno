import { startBot } from "./mod.ts";

startBot({
  token: "Nzg1MTM3Mjg5MDcyMDgyOTY1.X8zeFA.0QxwwM9TDjKWbiv_Ae16kKAOpz8",
  intents: ["GUILDS", "GUILD_MESSAGES"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message: any) {
      if (message.content === "ping") {
        message.reply("Pong using Discordeno!");
      }
    },
  },
});
