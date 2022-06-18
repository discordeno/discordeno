import { loadBot } from "../../mod.ts";
import { assertEquals } from "../../deps.ts";

Deno.test("[member] format a user avatar url (default user avatar)", () => {
  const bot = loadBot();
  assertEquals(bot.helpers.avatarURL(379643682984296448n, "2195"), "https://cdn.discordapp.com/embed/avatars/0.png");
});

Deno.test("[member] format a user avatar url (user avatar)", () => {
  const bot = loadBot();
  assertEquals(
    bot.helpers.avatarURL(379643682984296448n, "2195", { avatar: 3804984885868334326724060172849678101349n }),
    "https://cdn.discordapp.com/avatars/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=128",
  );
});

Deno.test("[member] format a members avatar url (guild member avatar)", () => {
  const bot = loadBot();
  assertEquals(
    bot.helpers.avatarURL(
      379643682984296448n,
      "2195",
      { avatar: 3804984885868334326724060172849678101349n, guildId: 785384884197392384n },
    ),
    "https://cdn.discordapp.com/guilds/785384884197392384/users/379643682984296448/avatars/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=128",
  );
});

Deno.test("[member] format a members avatar url (format png)", () => {
  const bot = loadBot();
  assertEquals(
    bot.helpers.avatarURL(
      379643682984296448n,
      "2195",
      { avatar: 3804984885868334326724060172849678101349n, format: "png" },
    ),
    "https://cdn.discordapp.com/avatars/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.png?size=128",
  );
});

Deno.test("[member] format a members avatar url (size 4096)", () => {
  const bot = loadBot();
  assertEquals(
    bot.helpers.avatarURL(
      379643682984296448n,
      "2195",
      { avatar: 3804984885868334326724060172849678101349n, size: 4096 },
    ),
    "https://cdn.discordapp.com/avatars/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=4096",
  );
});
