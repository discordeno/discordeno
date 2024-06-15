import { Collection } from '@discordeno/bot'
import prisma from '../prisma.js'
import languages, { type LanguageLocale, type LanguageNames, type TranslationKey } from './languages.js'

export const languageCache = new Collection<bigint, LanguageNames>()

export function translate<TKey extends TranslationKey>(
  guildIdOrLanguage: bigint | LanguageNames | undefined,
  key: TKey,
  ...params: GetTranslationArguments<TKey>
): string {
  const locale = getLocale(guildIdOrLanguage ?? 'english')
  const translation = locale[key]

  if (typeof translation === 'function') {
    // This type cast is needed to avoid TS doing stuff with the statically typed functions union
    const translationFunction = translation as (...args: unknown[]) => string

    return translationFunction(...params)
  }

  return translation
}

export function getLocale(guildIdOrLanguage: bigint | LanguageNames): LanguageLocale {
  return languages[getLanguage(guildIdOrLanguage)]
}

export function getLanguage(guildIdOrLanguage: bigint | LanguageNames): LanguageNames {
  const language =
    typeof guildIdOrLanguage === 'string'
      ? // guildIdOrLanguage is actually a language, so we can return it as is
        guildIdOrLanguage
      : // guildIdOrLanguage is a guildId, so we need to get from the cache what is the language for that server
        languageCache.get(guildIdOrLanguage) ?? 'english'

  return language
}

export async function loadLocale(guildId: bigint): Promise<void> {
  if (languageCache.has(guildId)) return

  const dbLanguage = await prisma.guild.findFirst({
    where: { guildId },
  })

  const language = (dbLanguage?.language ?? 'english') as LanguageNames

  // set the cache for the next time
  languageCache.set(guildId, language)
}

type GetTranslationArguments<TKey extends TranslationKey> = LanguageLocale[TKey] extends (...args: infer U) => unknown ? U : []
