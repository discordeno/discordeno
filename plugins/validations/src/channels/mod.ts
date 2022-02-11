import { Bot } from "../../deps.ts";
import setupThreadPermChecks from "./threads/mod.ts";
import setupStagePermChecks from "./stage.ts";

export default function setupChannelPermChecks(bot: Bot) {
  setupThreadPermChecks(bot);
  setupStagePermChecks(bot);
}
