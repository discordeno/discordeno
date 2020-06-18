# Avatar Command
```typescript
// This command is intentionally different from other commands to show that they can also be done this way.
// This is the ideal way because it will give you automated typings.

import { botCache } from "../../mod.ts";

botCache.commands.set(`avatar`, {
  callback: (message, _args, guild) => {
    const member = message.mentions.length
      ? message.mentions()[0]
      : message.member();

    return message.channel.sendMessage({
      embed: {
        author: {
          name: member.tag,
          icon_url: member.avatarURL(),
        },
        image: {
          url: member.avatarURL(2048),
        },
      },
    });
  },
});
```