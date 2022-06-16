import { loadBot } from "../../mod.ts";
import { assertEquals } from "../../deps.ts";
Deno.test("[member] banner URL test group", async (t) => {
  const bot = loadBot();
  await t.step("[member] banner URL user avatar", async () => {
    assertEquals(
      bot.helpers.bannerURL(379643682984296448n, { banner: 3804984885868334326724060172849678101349n }),
      "https://cdn.discordapp.com/banners/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=128",
    );
  });
  await t.step("[member] banner URL guild member avatar", async () => {
    assertEquals(
      bot.helpers.bannerURL(379643682984296448n, {
        banner: 3804984885868334326724060172849678101349n,
        guildId: 785384884197392384n,
      }),
      "https://cdn.discordapp.com/guilds/785384884197392384/users/379643682984296448/banners/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=128",
    );
  });
  await t.step("[member] banner URL user avatar (format png)", async () => {
    assertEquals(
      bot.helpers.bannerURL(379643682984296448n, { banner: 3804984885868334326724060172849678101349n, format: "png" }),
      "https://cdn.discordapp.com/banners/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.png?size=128",
    );
  });
  await t.step("[member] banner URL guild member avatar (format png)", async () => {
    assertEquals(
      bot.helpers.bannerURL(379643682984296448n, {
        banner: 3804984885868334326724060172849678101349n,
        guildId: 785384884197392384n,
        format: "png",
      }),
      "https://cdn.discordapp.com/guilds/785384884197392384/users/379643682984296448/banners/2e8d6ed6b19ce257d70fec7c26bfab65.png?size=128",
    );
  });
});
