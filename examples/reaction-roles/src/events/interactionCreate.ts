import { InteractionTypes, MessageComponentTypes, commandOptionsParser } from '@discordeno/bot'
import { bot } from '../bot.js'
import type ItemCollector from '../collector.js'
import commands from '../commands/index.js'

export const collectors = new Set<ItemCollector<typeof bot.transformers.$inferredTypes.interaction>>()

export const event: typeof bot.events.interactionCreate = async (interaction) => {
  // Give to all the collectors the interaction to use
  for (const collector of collectors) {
    collector.collect(interaction)
  }

  // If the interaction is a command check if it is a command and run it
  if (interaction.type === InteractionTypes.ApplicationCommand) {
    if (!interaction.data) return

    const command = commands.get(interaction.data.name)
    if (!command) return

    try {
      // @ts-expect-error commandOptionsParser is bugged at the moment, it wants an Interaction and not the desired props customized interaction
      await command.execute(interaction, commandOptionsParser(interaction))
    } catch (error) {
      console.error(error)
    }
  }

  // If the interaction is a button it might be the button press on our reaction role message
  if (interaction.type === InteractionTypes.MessageComponent && interaction.data?.componentType === MessageComponentTypes.Button) {
    // The interaction is not a button press on the role button
    if (!interaction.data?.customId?.startsWith('reactionRoles-role-')) return
    if (!interaction.guildId || !interaction.member) return

    // Remove the prefix and get the roleId
    const roleId = BigInt(interaction.data.customId.slice('reactionRoles-role-'.length))

    // Check if we need to remove or add the role to the user
    const alreadyHasRole = !!interaction.member.roles.find((role) => role === roleId)

    try {
      if (alreadyHasRole) {
        await bot.helpers.removeRole(interaction.guildId, interaction.user.id, roleId, `Reaction role button for role id ${roleId}`)
        await interaction.respond(`I removed from you the <@&${roleId}> role.`, { isPrivate: true })
        return
      }

      // You will get an invalid request made if the bot attempts to give a bot role, a role higher then him hightest role, a link role or if it does not have the Manage Roles permission
      // This could be prevented by checking for the roles that the bot owns and the role that the bot is trying to add
      await bot.helpers.addRole(interaction.guildId, interaction.user.id, roleId, `Reaction role button for role id ${roleId}`)
      await interaction.respond(`I added to you the <@&${roleId}> role.`, { isPrivate: true })
    } catch {
      // Respond with an error message
      await interaction.respond(
        'I could not give you the role. Possible reasons are:\n- My permissions are not configured correctly, make sure i have the `Manage Roles` permission\n- The role is **above** my hightest role in the server setup\n- The role does not exist or is non-manageable (for example: bot roles, link roles or @everyone)',
        { isPrivate: true },
      )
    }
  }
}
