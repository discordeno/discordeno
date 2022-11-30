import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test({
  name: "[stickers] Get sticker",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const sticker = await bot.helpers.getSticker(749054660769218631n);
    assertEquals(sticker.name, "Wave");
  },
});
