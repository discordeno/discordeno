import { formatImageURL, hasProperty, iconBigintToHash, iconHashToBigInt, validateLength } from "../mod.ts";
import { bigintToSnowflake, snowflakeToBigint } from "../util/bigint.ts";
import { removeTokenPrefix } from "../util/token.ts";
import { assertEquals, assertNotEquals } from "./deps.ts";
import { loadBot } from "./mod.ts";

Deno.test({
  name: "[token] Remove token prefix when Bot is prefixed.",
  async fn(t) {
    assertEquals("discordeno is best lib", removeTokenPrefix("Bot discordeno is best lib"));
  },
});

Deno.test({
  name: "[token] Remove token prefix when Bot is NOT prefixed.",
  async fn(t) {
    assertEquals("discordeno is best lib", removeTokenPrefix("discordeno is best lib"));
  },
});

Deno.test("[bigint] - Transform a snowflake string to bigint", () => {
  const text = "130136895395987456";
  const big = 130136895395987456n;
  const result = snowflakeToBigint(text);

  assertEquals(big, result);
  assertNotEquals(text, result);
});

Deno.test("[bigint] - Transform a bigint to a string", () => {
  const text = "130136895395987456";
  const big = 130136895395987456n;
  const result = bigintToSnowflake(big);

  assertEquals(text, result);
  assertNotEquals(big, result);
});

Deno.test("[emoji] Create an emoji url", async () => {
  const bot = await loadBot();
  assertEquals(
    bot.helpers.emojiUrl(785403373817823272n, false),
    "https://cdn.discordapp.com/emojis/785403373817823272.png",
  );
  assertEquals(
    bot.helpers.emojiUrl(785403373817823272n, true),
    "https://cdn.discordapp.com/emojis/785403373817823272.gif",
  );
});

Deno.test({
  name: "[guild] format a guild's icon url",
  fn: async () => {
    const bot = await loadBot();
    assertEquals(
      bot.helpers.guildIconURL(785384884197392384n, 3837424427068676005442449262648382018748n),
      "https://cdn.discordapp.com/icons/785384884197392384/46f50fb412eab14ec455d5cf777154bc.jpg?size=128",
    );
  },
});

Deno.test({
  name: "[guild] format a guild's banner url",
  fn: async () => {
    const bot = await loadBot();

    assertEquals(
      bot.helpers.guildBannerURL(613425648685547541n, {
        banner: 3919584870146358272366452115178209474142n,
      }),
      "https://cdn.discordapp.com/banners/613425648685547541/84c4964c115c128fb9100952c3b4f65e.jpg?size=128",
    );
  },
});

Deno.test({
  name: "[guild] format a guild's splash url",
  fn: async () => {
    const bot = await loadBot();
    assertEquals(
      bot.helpers.guildSplashURL(785384884197392384n, 3837424427068676005442449262648382018748n),
      "https://cdn.discordapp.com/splashes/785384884197392384/46f50fb412eab14ec455d5cf777154bc.jpg?size=128",
    );
  },
});

Deno.test({
  name: "[utils] format image url",
  fn() {
    assertEquals(formatImageURL(`https://skillz.is.pro`), "https://skillz.is.pro.jpg?size=128");
    assertEquals(formatImageURL(`https://skillz.is.pro`, 1024), "https://skillz.is.pro.jpg?size=1024");
    assertEquals(formatImageURL(`https://skillz.is.pro`, 1024, "gif"), "https://skillz.is.pro.gif?size=1024");
    assertEquals(formatImageURL(`https://skillz.is.pro`, undefined, "gif"), "https://skillz.is.pro.gif?size=128");
  },
});

const iconHash = "4bbb271a13f7195031adcc06a2d867ce";
const iconBigInt = 3843769888406823508519992434416504301518n;
const a_iconHash = "a_4bbb271a13f7195031adcc06a2d867ce";
const a_iconBigInt = 3503487521485885045056617826984736090062n;

Deno.test({
  name: "[utils] icon hash to bigint",
  fn() {
    assertEquals(iconHashToBigInt(iconHash), iconBigInt);
  },
});

Deno.test({
  name: "[utils] icon bigint to hash",
  fn() {
    assertEquals(iconBigintToHash(iconBigInt), iconHash);
  },
});

Deno.test({
  name: "[utils] icon hash to bigint a_ (animated)",
  fn() {
    assertEquals(iconHashToBigInt(a_iconHash), a_iconBigInt);
  },
});

Deno.test({
  name: "[utils] icon bigint to hash a_ (animated)",
  fn() {
    assertEquals(iconBigintToHash(a_iconBigInt), a_iconHash);
  },
});

Deno.test({
  name: "[utils] Validate length is too low",
  fn() {
    assertEquals(validateLength("test", { min: 5 }), false);
  },
});

Deno.test({
  name: "[utils] Validate length is too high",
  fn() {
    assertEquals(validateLength("test", { max: 3 }), false);
  },
});

Deno.test({
  name: "[utils] Validate length is NOT just right in between.",
  fn() {
    assertEquals(validateLength("test", { min: 5, max: 3 }), false);
  },
});

Deno.test({
  name: "[utils] Validate length is NOT too low",
  fn() {
    assertEquals(validateLength("test", { min: 3 }), true);
  },
});

Deno.test({
  name: "[utils] Validate length is NOT too high",
  fn() {
    assertEquals(validateLength("test", { max: 5 }), true);
  },
});

Deno.test({
  name: "[utils] Validate length is just right in between.",
  fn() {
    assertEquals(validateLength("test", { min: 3, max: 6 }), true);
  },
});

const obj = { prop: "lts372005" };

Deno.test({
  name: "[utils] hasProperty does HAVE property",
  fn() {
    assertEquals(hasProperty(obj, "prop"), true);
  },
});

Deno.test({
  name: "[utils] hasProperty does NOT HAVE property",
  fn() {
    assertEquals(hasProperty(obj, "lts372005"), false);
  },
});