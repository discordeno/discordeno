import type { Role } from '@discordeno/bot'
import { ApplicationCommandOptionTypes, ButtonStyles } from '@discordeno/types'
import type { Command } from './index.js'

const command: Command = {
  name: 'roles',
  description: 'Role management on your server.',
  options: [
    {
      name: 'reactions',
      description: 'Manage the role reactions on your server.',
      type: ApplicationCommandOptionTypes.SubCommandGroup,
      options: [
        {
          name: 'create',
          description: 'Create a reaction role on your server.',
          required: false,
          type: ApplicationCommandOptionTypes.SubCommand,
          options: [
            {
              required: true,
              name: 'emoji',
              description: "What would you like to set as this button's emoji?",
              type: ApplicationCommandOptionTypes.String,
            },
            {
              required: true,
              name: 'color',
              description: "What color would you like to set as this button's color?",
              type: ApplicationCommandOptionTypes.Integer,
              choices: [
                { name: 'Blue', value: ButtonStyles.Primary },
                { name: 'Green', value: ButtonStyles.Success },
                { name: 'Grey', value: ButtonStyles.Secondary },
                { name: 'Red', value: ButtonStyles.Danger },
              ],
            },
            {
              required: false,
              name: 'label',
              description: 'What would you like to set for the name on this button?',
              type: ApplicationCommandOptionTypes.String,
            },
          ],
        },
      ],
    },
  ],
  async execute(interaction, args: CommandArgs) {
    // Create a reaction role
    if (args.reactions?.create) {
      interaction.respond('Hello world!', { isPrivate: true })
    }
  },
}

export default command

interface CommandArgs {
  reactions?: {
    create?: {
      role: Role
      emoji: string
      color: ButtonStyles
      label?: string
    }
  }
}
