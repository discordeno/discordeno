import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test({
  name: "[guild] format a guild's icon url",
  fn: () => {
    assertEquals(bot.helpers.guildIconURL(guild.id, { icon: guild.icon }), undefined);
    assertEquals(
      bot.helpers.guildIconURL(785384884197392384n, {
        icon: 3837424427068676005442449262648382018748n,
      }),
      "https://cdn.discordapp.com/icons/785384884197392384/46f50fb412eab14ec455d5cf777154bc.jpg?size=128"
    );
  },
});

Deno.test({
  name: "[guild] format a guild's banner url",
  fn: () => {
    assertEquals(bot.helpers.guildBannerURL(guild.id, { banner: guild.banner }), undefined);
    assertEquals(
      bot.helpers.guildBannerURL(613425648685547541n, {
        banner: 3919584870146358272366452115178209474142n,
      }),
      "https://cdn.discordapp.com/banners/613425648685547541/84c4964c115c128fb9100952c3b4f65e.jpg?size=128"
    );
  },
});

Deno.test({
  name: "[guild] format a guild's splash url",
  fn: () => {
    assertEquals(bot.helpers.guildSplashURL(guild.id, { splash: guild.splash }), undefined);
    assertEquals(
      bot.helpers.guildSplashURL(785384884197392384n, {
        splash: 3837424427068676005442449262648382018748n,
      }),
      "https://cdn.discordapp.com/splashes/785384884197392384/46f50fb412eab14ec455d5cf777154bc.jpg?size=128"
    );
  },
});
