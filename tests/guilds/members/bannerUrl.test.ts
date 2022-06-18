import { loadBot } from "../../mod.ts";
import { assertEquals } from "../../deps.ts";
Deno.test("[member] format a user banner url (user banner)", () => {
  const bot = loadBot();
  assertEquals(
    bot.helpers.bannerURL(379643682984296448n, 3804984885868334326724060172849678101349n),
    "https://cdn.discordapp.com/banners/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=128",
  );
});

Deno.test("[member] format a member banner url (guild member banner)", () => {
  const bot = loadBot();
  assertEquals(
    bot.helpers.bannerURL(
      379643682984296448n,
      3804984885868334326724060172849678101349n,
      { guildId: 785384884197392384n },
    ),
    "https://cdn.discordapp.com/guilds/785384884197392384/users/379643682984296448/banners/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=128",
  );
});

Deno.test("[member] format a member banner url (format png)", () => {
  const bot = loadBot();
  assertEquals(
    bot.helpers.bannerURL(379643682984296448n, 3804984885868334326724060172849678101349n, { format: "png" }),
    "https://cdn.discordapp.com/banners/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.png?size=128",
  );
});
