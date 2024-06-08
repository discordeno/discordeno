import { ApplicationCommandOptionTypes } from 'discordeno'
import { prisma } from '../../prisma.js'
import languages from '../languages/languages.js'
import { serverLanguages, translate } from '../languages/translate.js'
import { createCommand } from '../utils/slash/createCommand.js'

export default createCommand({
  name: 'LANGUAGE_NAME',
  description: 'LANGUAGE_DESCRIPTION',
  options: [
    {
      name: 'LANGUAGE_KEY_NAME',
      description: 'LANGUAGE_KEY_DESCRIPTION',
      type: ApplicationCommandOptionTypes.String,
      choices: Object.keys(languages).map((key) => ({ name: key, value: key })),
      required: true,
    },
  ],
  execute: async function (_, interaction, args) {
    if (!interaction.guildId) return

    // Set the new language in cache
    serverLanguages.set(interaction.guildId, args.name)
    // Let the user know its been updated.
    await interaction.reply(translate(interaction.guildId, 'LANGUAGE_UPDATED', args.name))
    // Update the db
    return await prisma.guilds.upsert({
      where: { id: interaction.guildId },
      create: { language: args.name, id: interaction.guildId },
      update: { language: args.name },
    })
  },
})
