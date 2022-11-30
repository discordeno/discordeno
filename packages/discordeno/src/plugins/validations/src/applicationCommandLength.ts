import { ApplicationCommandOption, CreateSlashApplicationCommand } from '../deps.js'
export function validateApplicationCommandLength(options: CreateSlashApplicationCommand) {
  let length = 0
  if (options.nameLocalizations) {
    length += Math.max(options.name.length, ...Object.values(options.nameLocalizations).map((name) => name.length))
  } else length += options.name.length
  if (options.descriptionLocalizations) {
    length += Math.max(
      options.description.length,
      ...Object.values(options.descriptionLocalizations).map((name) => name.length)
    )
  } else {
    length += options.description.length
  }
  if (options.options != null) length += validateApplicationCommandOptionLength(options.options)

  if (length > 4000) {
    throw new Error(
      'Slash commands can have a maximum of 4000 characters for combined name, description, and value properties for each command, its options (including subcommands and groups), and choices. When localization fields are present, only the longest localization for each field (including the default value) is counted towards the size limit.'
    )
  }
}

function validateApplicationCommandOptionLength(options: ApplicationCommandOption[]) {
  let length = 0
  for (const option of options) {
    if (option.nameLocalizations != null) {
      length += Math.max(option.name.length, ...Object.values(option.nameLocalizations).map((name) => name.length))
    } else length += option.name.length
    if (option.descriptionLocalizations != null) {
      length += Math.max(
        option.description.length,
        ...Object.values(option.descriptionLocalizations).map((name) => name.length)
      )
    } else {
      length += option.description.length
    }

    if (option.choices != null) {
      for (const choice of option.choices) {
        length += choice.value.toString().length
        if (choice.nameLocalizations != null) {
          length += Math.max(option.name.length, ...Object.values(choice.nameLocalizations).map((name) => name.length))
        } else length += choice.name.length
      }
    }

    if (option.options != null) length += validateApplicationCommandOptionLength(option.options)
  }
  return length
}
