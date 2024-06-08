// This file allows you to tell typescript about any additions you have made to the internal discordeno objects.
import type { Interaction, InteractionCallbackData, InteractionResponse, Message } from 'discordeno'

export interface InteractionWithCustomProps extends Interaction {
  // Normally, to send a response you would have to do something like bot.helpers.sendInteractionResponse(interaction.id, interaction.token, { type: InteractionResponseTypes.ChannelMessageWithSource, data: { content: "text here" } })
  // But with this reply method we added, it is as simple as interaction.reply("text here").
  // Feel free to delete these comments once you have understood the concept.
  /** Send a reply to an interaction. */
  reply: (response: InteractionResponse | string) => Promise<Message | undefined>
  /** Edit a deferred reply of an interaction. */
  editReply: (response: InteractionCallbackData | string) => Promise<Message | undefined>
}
