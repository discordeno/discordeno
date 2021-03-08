import { startBot } from "./src/bot.ts";

startBot({
  token: "Nzg1MTM3Mjg5MDcyMDgyOTY1.X8zeFA.vP6lAmWqO2wy9-uOyV4__wNMy8o",
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_EMOJIS"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      if (message.content === "ping") {
        message.reply("Pong using Discordeno!");
      }
    },
    guildEmojisUpdate(g, e, c) {
      console.log(e);
    },
  },
});
