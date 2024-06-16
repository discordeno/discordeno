import { ApplicationCommandOptionTypes, DiscordInteractionContextType } from '@discordeno/bot'
import assert from 'node:assert'
import createCommand from '../commands.js'
import type { LanguageNames } from '../languages/languages.js'
import { languageCache, translate } from '../languages/translate.js'
import prisma from '../prisma.js'
import { updateCommands } from '../utils/updateCommands.js'

createCommand({
  name: 'languageCommandName',
  description: 'languageCommandDescription',
  // Allow this command only in Guilds, it will not appear in DMs
  contexts: [DiscordInteractionContextType.Guild],
  // By default, allow only someone with MANAGE_GUILD to run this command
  defaultMemberPermissions: ['MANAGE_GUILD'],
  options: [
    {
      name: 'languageCommandOptionName',
      description: 'languageCommandDescription',
      type: ApplicationCommandOptionTypes.String,
      // choices: Object.keys(languages).map((key) => ({ name: key, value: key })),
      autocomplete: true,
      required: true,
    },
  ],
  async run(interaction, options) {
    assert(interaction.guildId, '/language - The guildId is missing in the interaction')

    await interaction.defer(true)
    const language = options.language as LanguageNames

    // Update the db
    await prisma.guild.upsert({
      where: { guildId: interaction.guildId },
      create: { language, guildId: interaction.guildId },
      update: { language },
    })

    // Update the cache
    languageCache.set(interaction.guildId, language)
    // Update the commands for this guild so they get the new translation
    await updateCommands(interaction.guildId)

    // Let the user know its been updated.
    await interaction.respond(translate(interaction.guildId, 'languageCommandUpdated', language))
  },
  async autoComplete(interaction, options) {
    await interaction.respond({
      choices: [
        {
          name: 'A',
          value: 'B',
        },
        {
          name: 'input',
          value: options.language,
        },
      ],
    })
  },
})
