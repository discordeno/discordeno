import { ApplicationCommandOptionChoice, BigString, Bot, InteractionResponseTypes } from '../deps.js'

export async function sendAutocompleteChoices(
  bot: Bot,
  interactionId: BigString,
  interactionToken: string,
  choices: ApplicationCommandOptionChoice[]
): Promise<void> {
  await bot.helpers.sendInteractionResponse(interactionId, interactionToken, {
    type: InteractionResponseTypes.ApplicationCommandAutocompleteResult,
    data: {
      choices
    }
  })
}
