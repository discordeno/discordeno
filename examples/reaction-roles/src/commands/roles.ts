import {
  MessageComponentTypes,
  TextStyles,
  type ActionRow,
  type ButtonComponent,
  type Interaction,
  type Role,
  type SelectMenuComponent,
} from '@discordeno/bot'
import { ApplicationCommandOptionTypes, ButtonStyles } from '@discordeno/types'
import ItemCollector from '../collector.js'
import { collectors } from '../events/interactionCreate.js'
import { bot } from '../index.js'
import type { Command } from './index.js'

const command: Command = {
  name: 'roles',
  description: 'Role management on your server.',
  // Do not allow to run this command in DM.
  dmPermission: false,
  // Require the user to have Manage Guild and Manage Roles by-default
  defaultMemberPermissions: ['MANAGE_GUILD', 'MANAGE_ROLES'],
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
              name: 'role',
              description: 'What role would you like to set for this button?',
              type: ApplicationCommandOptionTypes.Role,
            },
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
              // Discord imposed limit for button
              maxLength: 80,
            },
          ],
        },
      ],
    },
  ],
  async execute(interaction, args: CommandArgs) {
    // Create a reaction role
    if (args.reactions?.create) {
      // Ensure that there is a channelId
      if (!interaction.channelId) {
        await interaction.respond('Could not get the current channel.', { isPrivate: true })
        return
      }

      // This array is used to store all the roles for this reaction roles
      let roles = [args.reactions.create]

      // Send the message that uses will use to get the role
      const roleMessage = await bot.helpers.sendMessage(interaction.channelId, {
        content: 'Pick your roles',
        components: getRoleButtons(roles),
      })

      // Create a copy of the actionRow for the main message
      // NOTE: we use a copy so when we edit this actionRow the edits don't get applied to all the command executions, only this one
      const messageActionRow = structuredClone(messageActionRowTemplate)

      await interaction.defer(true)
      const message = await interaction.respond(
        {
          content: 'Use the buttons in this message to edit the message below.',
          components: [messageActionRow],
        },
        { isPrivate: true },
      )

      if (!message) {
        await interaction.respond('❌ Unable to send the message correctly. Cancelling', { isPrivate: true })
        return
      }

      // Create the collector for the menu
      const itemCollector = new ItemCollector<Interaction>()
      collectors.add(itemCollector)

      // For the new reaction role, we need to keep track of what the user gave us
      let partialRoleInfo: Partial<(typeof roles)[number]> | undefined

      itemCollector.onItem(async (i) => {
        // We need to verify the interaction is for us.
        if (i.message?.id.toString() !== message.id) {
          return
        }

        // Save button
        if (i.data?.customId === messageActionRowTemplate.components[2]?.customId) {
          // Remove this item collector from the list of collectors (we aren't correcting anymore)
          collectors.delete(itemCollector)

          // Delete the edit message
          await i.defer(true)
          await i.delete()

          return
        }

        // New button
        if (i.data?.customId === messageActionRowTemplate.components[0]?.customId) {
          await i.defer(true)

          partialRoleInfo = {}

          // Ask the user for the role
          await i.edit({ content: 'Pick a role for the new reaction role', components: [selectRoleActionRow] })
          return
        }

        // New button - role select menu
        if (partialRoleInfo && i.data?.customId === selectRoleActionRow.components[0]?.customId) {
          const roleToAdd = i.data?.resolved?.roles?.first()

          // Verify that we could get the role from discord
          if (!roleToAdd) {
            throw new Error('Unable to get the information for the role to add')
          }

          // Save it to our partial role information
          partialRoleInfo.role = roleToAdd

          // Ask the user for the color of the button
          await i.defer(true)
          await i.edit({
            content: 'Pick a color for the reaction role',
            components: [selectColorActionRow],
          })

          return
        }

        // New button - color select menu
        if (partialRoleInfo && i.data?.customId === selectColorActionRow.components[0]?.customId) {
          const color = parseInt(i.data?.values?.[0] ?? 'NaN')

          // Verify that we could get the color information
          if (isNaN(color)) {
            throw new Error('Unable to get the information for the role to add')
          }

          // Save the color to our partial
          partialRoleInfo.color = color

          // Ask the user to input the emoji and optionally a label for the button
          await i.respond({
            title: 'Pick an emoji and label for the reaction role',
            components: [selectEmojiActionRow, selectLabelActionRow],
            customId: 'reactionRoles-add-modal',
          })

          return
        }

        // New button - emoji & label modal
        if (partialRoleInfo && i.data?.customId === 'reactionRoles-add-modal') {
          // Ensure that we can get the channelId from the interaction
          if (!interaction.channelId) {
            throw new Error('Unable to get current channel')
          }

          // Get the data from discord
          const emoji = i.data.components?.[0]?.components?.[0].value
          const label = i.data.components?.[1]?.components?.[0].value

          // Verify that the emoji was given
          if (!emoji) {
            throw new Error('Unable to get the information for the role to add')
          }

          // Save them to our partial
          partialRoleInfo.emoji = emoji
          partialRoleInfo.label = label

          // Save role and display the new message editing the old one

          // We are sure that in this place the entire object has been assembled
          roles.push(partialRoleInfo as (typeof roles)[number])

          await bot.helpers.editMessage(interaction.channelId, roleMessage.id, {
            components: getRoleButtons(roles),
          })

          // Clear our partial roleInfo, we are done with it
          partialRoleInfo = undefined
          // In case the delete button was disabled (all the roles were deleted) re-enable it
          messageActionRow.components[1]!.disabled = false

          // Discord imposes a limit of 5 action rows and 5 buttons for actionRow = 25 buttons max
          // more than 25 will give an error, so we disable the new button
          if (roles.length === 25) {
            const button = messageActionRow.components[0] as ButtonComponent
            button.disabled = true
          }

          // Show again the main edit menu
          await interaction.edit({
            content: 'Use the buttons in this message to edit the message below.',
            components: [messageActionRow],
          })

          // Respond to the modal. A modal submit (type 5) interaction can't edit the original response
          await i.respond('Reaction role created successfully. You can use the message above to add/remove a role', { isPrivate: true })

          return
        }

        // Remove button
        if (i.data?.customId === messageActionRowTemplate.components[1]?.customId) {
          // Clone the actionRow for the remove select menu, this is to prevent unwanted data to appear to other users
          const removeActionRow = structuredClone(removeActionRowTemplate)
          const selectMenu = removeActionRow.components[0] as SelectMenuComponent

          // Add the possibile values for this select menu
          for (const roleInfo of roles) {
            selectMenu.options.push({
              label: `${roleInfo.emoji} ${roleInfo.label}`,
              value: roleInfo.role.id.toString(),
            })
          }

          // Ask the user for what reaction role they want to remove
          await i.defer(true)
          await i.edit({
            content: 'Select what reaction role to remove',
            components: [removeActionRow],
          })

          return
        }

        // Remove button - role select menu
        if (i.data?.customId === removeActionRowTemplate.components[0].customId) {
          // Ensure that we can get the channelId from the interaction
          if (!interaction.channelId) {
            throw new Error('Unable to get current channel')
          }

          // Get the role to delete from discord
          const roleToRemove = i.data?.values?.[0]

          // Ensure we got it
          if (!roleToRemove) {
            throw new Error('Unable to get the role to remove')
          }

          await i.defer(true)

          // Remove the role from the list
          roles = roles.filter((roleInfo) => roleInfo.role.id.toString() !== roleToRemove)

          // Edit the main button
          await bot.helpers.editMessage(interaction.channelId, roleMessage.id, {
            components: getRoleButtons(roles),
          })

          // If the new button was disabled (we were at 25 buttons) we re-enable it
          const button = messageActionRow.components[0] as ButtonComponent
          button.disabled = false

          // If we are at 0 roles, and the user tried to delete a role they will get locked in the menu, so we disable it
          if (roles.length === 0) {
            messageActionRow.components[1]!.disabled = true
          }

          // Show the main edit ui (new, remove, save)
          await i.edit({
            content: 'Use the buttons in this message to edit the message below.',
            components: [messageActionRow],
          })

          return
        }

        // We don't know what code to run for this interaction
        throw new Error('Unknown button')
      })
    }
  },
}

export default command

// Interface to type the arguments that we receive from discord
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

// Templates/ActionRows for the command to then be referenced in the various part of the code

const messageActionRowTemplate: ActionRow = {
  type: MessageComponentTypes.ActionRow,
  components: [
    {
      type: MessageComponentTypes.Button,
      style: ButtonStyles.Success,
      customId: 'reactionRoles-add',
      emoji: {
        name: '➕',
      },
      label: 'Add',
      disabled: false,
    },
    {
      type: MessageComponentTypes.Button,
      style: ButtonStyles.Danger,
      customId: 'reactionRoles-remove',
      emoji: {
        name: '➖',
      },
      label: 'Remove',
      disabled: false,
    },
    {
      type: MessageComponentTypes.Button,
      style: ButtonStyles.Success,
      customId: 'reactionRoles-save',
      emoji: {
        name: '✅',
      },
      label: 'Save',
    },
  ],
} as const

const removeActionRowTemplate: ActionRow = {
  type: MessageComponentTypes.ActionRow,
  components: [
    {
      type: MessageComponentTypes.SelectMenu,
      customId: 'reactionRoles-remove-selectMenu',
      maxValues: 1,
      minValues: 1,
      placeholder: 'Select roles',
      options: [],
    },
  ],
} as const

const selectRoleActionRow: ActionRow = {
  type: MessageComponentTypes.ActionRow,
  components: [
    {
      type: MessageComponentTypes.SelectMenuRoles,
      customId: 'reactionRoles-add-role',
      maxValues: 1,
      minValues: 1,
      placeholder: 'Select a role',
    },
  ],
} as const

const selectEmojiActionRow: ActionRow = {
  type: MessageComponentTypes.ActionRow,
  components: [
    {
      type: MessageComponentTypes.InputText,
      style: TextStyles.Short,
      customId: 'reactionRoles-add-emoji',
      label: 'Emoji for the reaction role',
      required: true,
    },
  ],
} as const

const selectColorActionRow: ActionRow = {
  type: MessageComponentTypes.ActionRow,
  components: [
    {
      type: MessageComponentTypes.SelectMenu,
      customId: 'reactionRoles-add-color',
      options: [
        { label: 'Blue', value: ButtonStyles.Primary.toString() },
        { label: 'Green', value: ButtonStyles.Success.toString() },
        { label: 'Grey', value: ButtonStyles.Secondary.toString() },
        { label: 'Red', value: ButtonStyles.Danger.toString() },
      ],
    },
  ],
} as const

const selectLabelActionRow: ActionRow = {
  type: MessageComponentTypes.ActionRow,
  components: [
    {
      type: MessageComponentTypes.InputText,
      style: TextStyles.Short,
      customId: 'reactionRoles-add-label',
      label: 'Label for the reaction role [OPTIONAL]',
      required: false,
      // Discord imposed limit for button labels
      maxLength: 80,
    },
  ],
} as const

// Function to get all the actionRows with buttons for the reaction roles message
function getRoleButtons(
  roles: Array<{
    role: Role
    emoji: string
    color: ButtonStyles
    label?: string | undefined
  }>,
): ActionRow[] {
  const actionRows: ActionRow[] = []

  // If there aren't any roles, we don't need any buttons
  if (roles.length === 0) return actionRows

  // We add the components later, so we need to make typescript know that we are sure that it will be a compatibile components array
  actionRows.push({ type: MessageComponentTypes.ActionRow, components: [] as unknown as ActionRow['components'] })

  for (const roleInfo of roles) {
    let actionRow = actionRows.at(-1)

    // Ensure that we were able to get the actionRow
    if (!actionRow) {
      throw new Error('Unable to get actionRow')
    }

    // If the actionRow is full (has 5 buttons) add a new one
    if (actionRow.components.length === 5) {
      actionRow = { type: MessageComponentTypes.ActionRow, components: [] as unknown as ActionRow['components'] }
      actionRows.push(actionRow)
    }

    // Add the new button to this actionRow
    actionRow?.components.push({
      type: MessageComponentTypes.Button,
      style: roleInfo.color,
      emoji: {
        name: roleInfo.emoji,
      },
      label: roleInfo.label,
      customId: `reactionRoles-role-${roleInfo.role.id}`,
    })
  }

  return actionRows
}
