import { Bot, Interaction } from "../../deps.ts";
import Embeds from "./Embeds.ts";
import { getUserTag } from "./helpers.ts";
import logger from "./logger.ts";

export async function slashLogWebhook(
  bot: Bot,
  payload: Interaction,
  name: string,
) {
  const webhook = Deno.env.get("DISCORD_LOGS_WEBHOOK");
  if (!webhook) return;

  const [id, token] = webhook.substring(webhook.indexOf("webhooks/") + 9).split(
    "/",
  );

  const embeds = new Embeds(bot)
    .setAuthor(`${getUserTag(payload.user)} used ${name}`, payload.user)
    .addField(
      "Channel",
      payload.channelId?.toString() || "Channel ID unavailable",
      true,
    )
    .addField(
      "Guild",
      payload.guildId?.toString() || "Guild ID unavailable",
      true,
    );

  await bot.helpers
    .sendWebhook(bot.transformers.snowflake(id), token, {
      embeds,
      wait: false,
    })
    .catch(logger.error);
}

export default slashLogWebhook;
