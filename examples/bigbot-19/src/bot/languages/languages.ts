import english from './english.js'
// TEMPLATE-SETUP: Import other locales if you have them

const languages: Record<LanguageNames, LanguageLocale> = {
  english,
}

export default languages

// TEMPLATE-SETUP: when adding a new locale, you should add them to this type with an OR
export type LanguageNames = 'english'

// TEMPLATE-SETUP: when adding new translation keys, you should add them to ensure all the locales have a translation
// When the translation does not need any parameters you can type it as `string`, if there is the need for parameters you can type is a function that returns a string
export interface LanguageLocale {
  //
  // slash command handler
  //
  executeCommandNotFound: string
  executeCommandError: string

  //
  // /language command
  //
  languageCommandName: string
  languageCommandDescription: string
  languageCommandOptionName: string
  languageCommandOptionDescription: string
  languageCommandUpdated: (language: LanguageNames) => string

  //
  // /ping command
  //
  pingCommandName: string
  pingCommandDescription: string
  pingCommandInitialResponse: string
  pingCommandResponseWithLatencies: (shardLatency: number, restLatency: number) => string
}

export type TranslationKey = keyof LanguageLocale
export type DefaultLocale = typeof english
