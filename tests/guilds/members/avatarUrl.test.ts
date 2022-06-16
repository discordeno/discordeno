import { loadBot } from "../../mod.ts";
import { assertEquals } from "../../deps.ts";
Deno.test("[member] avatar URL test group", async (t) => {
  const bot = loadBot();
  await t.step("[member] avatar URL user default avatar", async () => {
    assertEquals(bot.helpers.avatarURL(379643682984296448n, "2195"), "https://cdn.discordapp.com/embed/avatars/0.png");
  });
  await t.step("[member] avatar URL user avatar", async () => {
    assertEquals(
      bot.helpers.avatarURL(379643682984296448n, "2195", { avatar: 3804984885868334326724060172849678101349n }),
      "https://cdn.discordapp.com/avatars/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=128",
    );
  });
  await t.step("[member] avatar URL guild member avatar", async () => {
    assertEquals(
      bot.helpers.avatarURL(379643682984296448n, "2195", {
        avatar: 3804984885868334326724060172849678101349n,
        guildId: 785384884197392384n,
      }),
      "https://cdn.discordapp.com/guilds/785384884197392384/users/379643682984296448/avatars/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=128",
    );
  });
  await t.step("[member] avatar URL user avatar (format png)", async () => {
    assertEquals(
      bot.helpers.avatarURL(379643682984296448n, "2195", {
        avatar: 3804984885868334326724060172849678101349n,
        format: "png",
      }),
      "https://cdn.discordapp.com/avatars/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.png?size=128",
    );
  });
  await t.step("[member] avatar URL guild member avatar (format png)", async () => {
    assertEquals(
      bot.helpers.avatarURL(379643682984296448n, "2195", {
        avatar: 3804984885868334326724060172849678101349n,
        guildId: 785384884197392384n,
        format: "png",
      }),
      "https://cdn.discordapp.com/guilds/785384884197392384/users/379643682984296448/avatars/2e8d6ed6b19ce257d70fec7c26bfab65.png?size=128",
    );
  });
  await t.step("[member] avatar URL user avatar (size 16)", async () => {
    assertEquals(
      bot.helpers.avatarURL(379643682984296448n, "2195", {
        avatar: 3804984885868334326724060172849678101349n,
        size: 16,
      }),
      "https://cdn.discordapp.com/avatars/379643682984296448/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=16",
    );
  });
  await t.step("[member] avatar URL guild member avatar (size 16)", async () => {
    assertEquals(
      bot.helpers.avatarURL(379643682984296448n, "2195", {
        avatar: 3804984885868334326724060172849678101349n,
        guildId: 785384884197392384n,
        size: 16,
      }),
      "https://cdn.discordapp.com/guilds/785384884197392384/users/379643682984296448/avatars/2e8d6ed6b19ce257d70fec7c26bfab65.jpg?size=16",
    );
  });
});
