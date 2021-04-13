import { startBot } from "./mod.ts";

startBot({
  token: "ODMwMzYxODk1NTU5MTAyNDc0.YHFkxw.2TKM2BqfSTkAIjQ4p2FW4mHDONM",
  intents: ["GUILDS", "GUILD_MESSAGES"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    async messageCreate(message) {
      if (message.content === "ping") {
        const blob = await fetch("https://via.placeholder.com/150").then((
          res,
        ) => res.blob());
        message.send({
          file: {
            blob,
            name: "placeholder.jpeg",
          },
        });
        // message.reply("Pong using Discordeno!");
      }
    },
  },
});
