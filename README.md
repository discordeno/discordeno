# Discordeno

Discord API library wrapper in Deno

[Discord Server](https://discord.gg/J4NqJ72)

[Website](https://discordeno.netlify.app)

![Documentation](https://github.com/Skillz4Killz/Discordeno/workflows/Documentation/badge.svg)
![Testing](https://github.com/Skillz4Killz/Discordeno/workflows/Testing/Linting/badge.svg)

Starting with Discordeno is very simple, you can start from scratch without any boilerplates/frameworks: Add this snippet of code into a new TypeScript file:

```typescript
import Client from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v7/src/module/client.ts";
import { sendMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v7/src/handlers/channel.ts";
import { Intents } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v7/src/types/options.ts";
import config from "./config.ts";

Client({
    token: config.token,
    intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
    eventHandlers: {
        ready: () => {
            console.log(`Logged!`);
        },
        messageCreate: (message) => {
            if (message.content === "!ping") {
                sendMessage(message.channel, "Pong");
            }
        }
    }
});
```

Alternatively, you can use boilerplate template repositories that were created by wonderful developers. The official one is at: [GitHub](https://github.com/Skillz4Killz/Discordeno-bot-template) but there will be more listed on the website. It is a beautiful website indeed! Check it out!

![image](https://i.imgur.com/z1BfUnt.png)

#### Dark Mode

![image](https://i.imgur.com/Vr2Bebr.png)
