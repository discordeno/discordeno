import type { LanguageLocale } from './languages.js'

export default {
  //
  // slash command handler
  //
  executeCommandNotFound: '❌ Something went wrong. I was not able to find this command.',
  executeCommandError: '❌ Something went wrong. The command execution has thrown an error.',

  //
  // /language command
  //
  languageCommandName: 'language',
  languageCommandDescription: '⚙️ Change the bot language.',
  languageCommandOptionName: 'language',
  languageCommandOptionDescription: 'What language would you like to set?',
  languageCommandUpdated: (language: string) => `The language has been updated to ${language}`,

  //
  // /ping command
  //
  pingCommandName: 'ping',
  pingCommandDescription: '🏓 Check whether the bot is online and responsive.',
  pingCommandInitialResponse: '🏓 Pong! I am online and responsive! 🕙',
  pingCommandResponseWithLatencies: (shardLatency, restLatency) =>
    `🏓 Pong! Gateway Latency: ${shardLatency}ms, Roundtrip Latency: ${restLatency}ms. I am online and responsive! 🕙`,
} as const satisfies LanguageLocale
