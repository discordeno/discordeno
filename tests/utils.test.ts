import { Collection, formatImageURL, hasProperty, iconBigintToHash, iconHashToBigInt, validateLength } from "../mod.ts";
import { bigintToSnowflake, snowflakeToBigint } from "../util/bigint.ts";
import { removeTokenPrefix } from "../util/token.ts";
import { assertEquals, assertExists, assertNotEquals } from "./deps.ts";
import { loadBot } from "./mod.ts";
import { delayUntil } from "./utils.ts";

Deno.test({
  name: "[token] Remove token prefix when Bot is prefixed.",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals("discordeno is best lib", removeTokenPrefix("Bot discordeno is best lib"));
  },
});

Deno.test({
  name: "[token] Remove token prefix when Bot is NOT prefixed.",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals("discordeno is best lib", removeTokenPrefix("discordeno is best lib"));
  },
});

Deno.test({
  name: "[bigint] - Transform a snowflake string to bigint",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    const text = "130136895395987456";
    const big = 130136895395987456n;
    const result = snowflakeToBigint(text);

    assertEquals(big, result);
    assertNotEquals(text, result);
  },
});

Deno.test({
  name: "[bigint] - Transform a bigint to a string",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    const text = "130136895395987456";
    const big = 130136895395987456n;
    const result = bigintToSnowflake(big);

    assertEquals(text, result);
    assertNotEquals(big, result);
  },
});

Deno.test({
  name: "[emoji] Create an emoji url",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    assertEquals(
      bot.helpers.getEmojiURL(785403373817823272n, false),
      "https://cdn.discordapp.com/emojis/785403373817823272.png",
    );
    assertEquals(
      bot.helpers.getEmojiURL(785403373817823272n, true),
      "https://cdn.discordapp.com/emojis/785403373817823272.gif",
    );
  },
});

Deno.test({
  name: "[guild] format a guild's icon url",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    assertEquals(
      bot.helpers.getGuildIconURL(785384884197392384n, 3837424427068676005442449262648382018748n),
      "https://cdn.discordapp.com/icons/785384884197392384/46f50fb412eab14ec455d5cf777154bc.jpg?size=128",
    );
  },
});

Deno.test({
  name: "[guild] format a guild's banner url",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();

    assertEquals(
      bot.helpers.getGuildBannerURL(613425648685547541n, {
        banner: 3919584870146358272366452115178209474142n,
      }),
      "https://cdn.discordapp.com/banners/613425648685547541/84c4964c115c128fb9100952c3b4f65e.jpg?size=128",
    );
  },
});

Deno.test({
  name: "[guild] format a guild's splash url",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    assertEquals(
      bot.helpers.getGuildSplashURL(785384884197392384n, 3837424427068676005442449262648382018748n),
      "https://cdn.discordapp.com/splashes/785384884197392384/46f50fb412eab14ec455d5cf777154bc.jpg?size=128",
    );
  },
});

Deno.test({
  name: "[utils] format image url",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
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
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(iconHashToBigInt(iconHash), iconBigInt);
  },
});

Deno.test({
  name: "[utils] icon bigint to hash",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(iconBigintToHash(iconBigInt), iconHash);
  },
});

Deno.test({
  name: "[utils] icon hash to bigint a_ (animated)",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(iconHashToBigInt(a_iconHash), a_iconBigInt);
  },
});

Deno.test({
  name: "[utils] icon bigint to hash a_ (animated)",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(iconBigintToHash(a_iconBigInt), a_iconHash);
  },
});

Deno.test({
  name: "[utils] Validate length is too low",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(validateLength("test", { min: 5 }), false);
  },
});

Deno.test({
  name: "[utils] Validate length is too high",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(validateLength("test", { max: 3 }), false);
  },
});

Deno.test({
  name: "[utils] Validate length is NOT just right in between.",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(validateLength("test", { min: 5, max: 3 }), false);
  },
});

Deno.test({
  name: "[utils] Validate length is NOT too low",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(validateLength("test", { min: 3 }), true);
  },
});

Deno.test({
  name: "[utils] Validate length is NOT too high",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(validateLength("test", { max: 5 }), true);
  },
});

Deno.test({
  name: "[utils] Validate length is just right in between.",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(validateLength("test", { min: 3, max: 6 }), true);
  },
});

const obj = { prop: "lts372005" };

Deno.test({
  name: "[utils] hasProperty does HAVE property",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(hasProperty(obj, "prop"), true);
  },
});

Deno.test({
  name: "[utils] hasProperty does NOT HAVE property",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    assertEquals(hasProperty(obj, "lts372005"), false);
  },
});

Deno.test({
  name: "[member] format a members avatar url",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();

    assertEquals(
      bot.helpers.getAvatarURL(130136895395987456n, "8840", {
        avatar: 4055337350987360625717955448021200177333n,
      }),
      "https://cdn.discordapp.com/avatars/130136895395987456/eae5905ad2d18d7c8deca20478b088b5.jpg?size=128",
    );
  },
});

Deno.test({
  name: "[collection] Create a collection",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    const collection = new Collection();

    assertExists(collection);

    await t.step({
      name: "[collection] collection values to array",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        const testCollection = new Collection([["best", "tri"], ["proficient", "yui"]]);

        assertEquals(testCollection.array(), ["tri", "yui"]);
      },
    });

    await t.step({
      name: "[collection] get a random value",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        const testCollection = new Collection([["best", "tri"]]);

        assertEquals(["best", "tri"].includes(testCollection.random() ?? ""), true);
        assertEquals(collection.random(), undefined);
      },
    });

    await t.step({
      name: "[collection] Set a value without maxSize",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        collection.set("best developer", "triformine");
        assertEquals(collection.size, 1);
        assertEquals(collection.get("best developer"), "triformine");

        collection.set("deno", "yes");

        await t.step({
          name: "[collection] get the value of the first element",
          async fn(t) {
            assertEquals(collection.first(), "triformine");
          },
        });

        await t.step({
          name: "[collection] get the value of the last element",
          async fn(t) {
            assertEquals(collection.last(), "yes");
          },
        });
      },
    });

    await t.step({
      name: "[collection] Create a collection with maxSize",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        const maxSize = 2;

        const maxCollection = new Collection([], {
          maxSize,
        });

        assertExists(maxCollection);
        assertExists(maxCollection.maxSize);
        assertEquals(maxCollection.maxSize, maxSize);

        await t.step({
          name: "[collection] Test if maxSize works properly",
          async fn(t) {
            maxCollection.set("foo", "bar");
            maxCollection.set("me", "you");

            assertEquals(maxCollection.size, 2);

            maxCollection.set("this", "not");

            assertEquals(maxCollection.size, 2);

            await t.step({
              name: "[collection] Test if forceSet ignore maxSize",
              async fn(t) {
                maxCollection.forceSet("this", "not");

                assertEquals(maxCollection.size, 3);
              },
            });
          },
        });
      },
    });

    const testCollection = new Collection([["a", 1], ["b", 2], ["c", 3]]);

    await t.step({
      name: "[collection] find by key or value",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        assertEquals(testCollection.find((v, k) => v === 2), 2);
        assertEquals(testCollection.find((v, k) => k === "b"), 2);
      },
    });

    await t.step({
      name: "[collection] filter by key or value",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        assertEquals(testCollection.filter((v, k) => v === 3).size, 1);
        assertEquals(testCollection.filter((v, k) => k === "d").size, 0);
      },
    });

    await t.step({
      name: "[collection] map",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        assertEquals(testCollection.map((k, v) => `${v}${k}`), ["a1", "b2", "c3"]);
      },
    });

    await t.step({
      name: "[collection] some",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        assertEquals(testCollection.some((v, _) => v === 1), true);
        assertEquals(testCollection.some((v, _) => v === 4), false);
      },
    });

    await t.step({
      name: "[collection] every",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        assertEquals(testCollection.every((v, _) => v !== 0), true);
        assertEquals(testCollection.every((v, _) => v === 1), false);
      },
    });

    await t.step({
      name: "[collection] reduce",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        assertEquals(testCollection.reduce((acc, val) => acc + val, 0), 6);
      },
    });

    await t.step({
      name: "[collection] start sweeper",
      ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
      async fn(t) {
        const sweeperCollection = new Collection([["a", 1], ["b", 2]], {
          sweeper: {
            filter: (v, _) => v === 1,
            interval: 50,
          },
        });

        try {
          assertEquals(sweeperCollection.size, 2);

          await delayUntil(150, () => sweeperCollection.size !== 2, 50);

          assertEquals(sweeperCollection.size, 1);
        } catch (err) {
          sweeperCollection.stopSweeper();

          throw err;
        }

        sweeperCollection.stopSweeper();
      },
    });
  },
});
