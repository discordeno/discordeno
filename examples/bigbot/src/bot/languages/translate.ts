import Embeds from 'discordeno/embeds'
import { bot } from '../bot.js'
import { webhookURLToIDAndToken } from '../utils/webhook.js'
import type english from './english.js'
import languages from './languages.js'

const MISSING_TRANSLATION_WEBHOOK = process.env.MISSING_TRANSLATION_WEBHOOK

/** This should hold the language names per guild id. <guildId, language> */
export const serverLanguages = new Map<bigint, keyof typeof languages>()

export function translate<K extends translationKeys>(
  guildIdOrLanguage: bigint | keyof typeof languages,
  key: K,
  ...params: getArgs<K>
): string {
  const language = getLanguage(guildIdOrLanguage)
  let value: string | ((...any: any[]) => string) | string[] | undefined = languages[language]?.[key]

  // Was not able to be translated
  if (!value) {
    // Check if this key is available in english
    if (language !== 'english') {
      value = languages.english[key]
    }

    // Still not found in english so default to using the KEY_ITSELF
    if (!value) value = key

    // Send a log webhook so the devs know sth is missing
    missingTranslation(language, key)
  }

  if (Array.isArray(value)) return value.join('\n')

  if (typeof value === 'function') return value(...(params || []))

  return value
}

/** Get the language this guild has set, will always return "english" if it is not in cache */
export function getLanguage(guildIdOrLanguage: bigint | keyof typeof languages): string {
  return typeof guildIdOrLanguage === 'string' ? guildIdOrLanguage : serverLanguages.get(guildIdOrLanguage) ?? 'english'
}

export async function loadLanguage(guildId: bigint): Promise<void> {
  // TODO: add this settings
  // const settings = await database.findOne('guilds', guildId)
  const settings = { language: 'undefined' }

  if (settings?.language && languages[settings.language]) {
    serverLanguages.set(guildId, settings.language)
  } else serverLanguages.set(guildId, 'english')
}

/** Send a webhook for a missing translation key */
export async function missingTranslation(language: keyof typeof languages, key: string): Promise<void> {
  if (!MISSING_TRANSLATION_WEBHOOK) return
  const { id, token } = webhookURLToIDAndToken(MISSING_TRANSLATION_WEBHOOK)
  if (!id || !token) return

  const embeds = new Embeds()
    .setTitle('Missing Translation')
    .setColor('RANDOM')
    .addField('Language', language, true)
    .addField('Key', key, true)

  await bot.helpers
    .sendWebhookMessage(bot.transformers.snowflake(id), token, {
      // SETUP-DD-TEMP: If you wish to make it @ mention you, please edit the next line.
      // content: `<@${owner id here}>`,
      embeds,
      wait: false,
    })
    .catch(bot.logger.error)
}

// type translationKeys = keyof typeof english | string
export type translationKeys = keyof typeof english
type getArgs<K extends translationKeys> = (typeof english)[K] extends (...any: any[]) => unknown
  ? Parameters<(typeof english)[K]>
  : []
