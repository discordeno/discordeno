# Message Embed  
```typescript
import { botCache } from "../../mod.ts";

botCache.commands.set(`testembed`, {
  callback: (message, _args, guild) => {
    return message.channel.sendMessage({
      embed: {
        title: "Hello World!",
        color: 15576321,
        description: 'This embed is working! Yay',
      },
    });
  },
});
```