import { MISSING_TRANSLATION_WEBHOOK } from "../../../configs.ts";
import { Bot } from "../../../deps.ts";
import Embeds from "../../utils/Embeds.ts";
import logger from "../../utils/logger.ts";
import english from "./english.ts";
import languages from "./languages.ts";

/** This should hold the language names per guild id. <guildId, language> */
export const serverLanguages = new Map<bigint, keyof typeof languages>();

export function translate<K extends translationKeys>(
  bot: Bot,
  guildIdOrLanguage: bigint | keyof typeof languages,
  key: K,
  ...params: getArgs<K>
): string {
  const language = getLanguage(guildIdOrLanguage);
  // deno-lint-ignore no-explicit-any
  let value: string | ((...any: any[]) => string) | string[] = languages[language][key];

  // Was not able to be translated
  if (!value) {
    // Check if this key is available in english
    if (language !== "english") {
      value = languages.english[key];
    }

    // Still not found in english so default to using the KEY_ITSELF
    if (!value) value = key;

    // Send a log webhook so the devs know sth is missing
    missingTranslation(bot, language, key);
  }

  if (Array.isArray(value)) return value.join("\n");

  if (typeof value === "function") return value(...(params || []));

  return value as string;
}

/** Get the language this guild has set, will always return "english" if it is not in cache */
export function getLanguage(
  guildIdOrLanguage: bigint | keyof typeof languages,
) {
  return typeof guildIdOrLanguage === "string"
    ? guildIdOrLanguage
    : serverLanguages.get(guildIdOrLanguage) ?? "english";
}

export function loadLanguage(guildId: bigint) {
  // TODO: add this settings
  // const settings = await database.findOne('guilds', guildId)
  const settings = { language: "undefined" };

  if (settings?.language && languages[settings.language]) {
    serverLanguages.set(guildId, settings.language);
  } else serverLanguages.set(guildId, "english");
}

const [id, token] = MISSING_TRANSLATION_WEBHOOK.substring(
  MISSING_TRANSLATION_WEBHOOK.indexOf("webhooks/") + 9,
).split(
  "/",
);
/** Send a webhook for a missing translation key */
export async function missingTranslation(
  bot: Bot,
  language: keyof typeof languages,
  key: string,
) {
  if (!id || !token) return;

  const embeds = new Embeds(bot)
    .setTitle("Missing Translation")
    .setColor("RANDOM")
    .addField("Language", language, true)
    .addField("Key", key, true);

  await bot.helpers
    .sendWebhook(bot.transformers.snowflake(id), token, {
      embeds,
      wait: false,
    })
    .catch(logger.error);
}

// type translationKeys = keyof typeof english | string
export type translationKeys = keyof typeof english;
type getArgs<K extends translationKeys> = typeof english[K] extends // deno-lint-ignore no-explicit-any
(...any: any[]) => unknown ? Parameters<typeof english[K]>
  : [];
