import { Bot } from "../../deps.ts";
import setupCreateMessagePermChecks from "./create.ts";
import setupDeleteMessagePermChecks from "./delete.ts";

export default function setupMessagesPermChecks(bot: Bot) {
  setupDeleteMessagePermChecks(bot);
  setupCreateMessagePermChecks(bot);
}
