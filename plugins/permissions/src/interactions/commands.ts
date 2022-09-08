import {
  AllowedMentionsTypes,
  ApplicationCommandOption,
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  BotWithCache,
  CONTEXT_MENU_COMMANDS_NAME_REGEX,
  SLASH_COMMANDS_NAME_REGEX,
} from "../../deps.ts";
import { validateAttachments } from "../attachments.ts";

export function validateApplicationCommandOptions(
  bot: BotWithCache,
  options: ApplicationCommandOption[],
) {
  const requiredOptions: ApplicationCommandOption[] = [];
  const optionalOptions: ApplicationCommandOption[] = [];

  for (const option of options) {
    option.name = option.name.toLowerCase();

    if (option.choices?.length) {
      if (option.choices.length > 25) {
        throw new Error("Too many application command options provided.");
      }

      if (
        option.type !== ApplicationCommandOptionTypes.String &&
        option.type !== ApplicationCommandOptionTypes.Integer
      ) {
        throw new Error("Only string or integer options can have choices.");
      }
    }

    if (!bot.utils.validateLength(option.name, { min: 1, max: 32 })) {
      throw new Error("Invalid application command option name.");
    }

    if (!bot.utils.validateLength(option.description, { min: 1, max: 100 })) {
      throw new Error("Invalid application command description.");
    }

    option.choices?.every((choice) => {
      if (!bot.utils.validateLength(choice.name, { min: 1, max: 100 })) {
        throw new Error(
          "Invalid application command option choice name. Must be between 1-100 characters long.",
        );
      }

      if (
        option.type === ApplicationCommandOptionTypes.String &&
        (typeof choice.value !== "string" || choice.value.length < 1 ||
          choice.value.length > 100)
      ) {
        throw new Error("Invalid slash options choice value type.");
      }

      if (
        option.type === ApplicationCommandOptionTypes.Integer &&
        typeof choice.value !== "number"
      ) {
        throw new Error("A number must be set for Integer types.");
      }
    });

    if (option.required) {
      requiredOptions.push(option);
      continue;
    }

    optionalOptions.push(option);
  }

  return [...requiredOptions, ...optionalOptions];
}

export function createApplicationCommand(bot: BotWithCache) {
  const createApplicationCommandOld = bot.helpers.createApplicationCommand;

  bot.helpers.createApplicationCommand = async function (options, guildId) {
    const isChatInput = !options.type ||
      options.type === ApplicationCommandTypes.ChatInput;

    if (!options.name) {
      throw new Error("A name is required to create a options.");
    }

    if (isChatInput) {
      if (!SLASH_COMMANDS_NAME_REGEX.test(options.name)) {
        throw new Error(
          "The name of the slash command did not match the required regex.",
        );
      }

      // Only slash need to be lowercase
      options.name = options.name.toLowerCase();

      // Slash commands require description
      if (!options.description) {
        throw new Error(
          "Slash commands require some form of a description be provided.",
        );
      } else if (!bot.utils.validateLength(options.description, { min: 1, max: 100 })) {
        throw new Error(
          "Application command descriptions must be between 1 and 100 characters.",
        );
      }

      if (options.options?.length) {
        if (options.options.length > 25) {
          throw new Error("Only 25 options are allowed to be provided.");
        }

        options.options = validateApplicationCommandOptions(bot, options.options);
      }

      const length = (options.nameLocalizations
        ? Math.max(
          options.name.length,
          ...Object.values(options.nameLocalizations).map((value) => value.length),
        )
        : options.name.length) +
        (options.descriptionLocalizations
          ? Math.max(
            options.description.length,
            ...Object.values(options.descriptionLocalizations).map((value) => value.length),
          )
          : options.description.length) +
        (options.options
          ? options.options.map((option) =>
            (option.nameLocalizations
              ? Math.max(
                option.name.length,
                ...Object.values(option.nameLocalizations).map((value) => value.length),
              )
              : option.name.length) +
            (option.descriptionLocalizations
              ? Math.max(
                option.description.length,
                ...Object.values(option.descriptionLocalizations).map((value) => value.length),
              )
              : option.description.length) +
            (option.choices
              ? option.choices.map((choice) =>
                choice.value.toString().length +
                (choice.nameLocalizations
                  ? Math.max(
                    choice.name.length,
                    ...Object.values(choice.nameLocalizations).map((value) => value.length),
                  )
                  : choice.name.length)
              ).reduce((prev, curr) => prev + curr)
              : 0) +
            (option.options
              ? option.options.map((option) =>
                (option.nameLocalizations
                  ? Math.max(
                    option.name.length,
                    ...Object.values(option.nameLocalizations).map((value) => value.length),
                  )
                  : option.name.length) +
                (option.descriptionLocalizations
                  ? Math.max(
                    option.description.length,
                    ...Object.values(option.descriptionLocalizations).map((value) => value.length),
                  )
                  : option.description.length) +
                (option.choices
                  ? option.choices.map((choice) =>
                    choice.value.toString().length +
                    (choice.nameLocalizations
                      ? Math.max(
                        choice.name.length,
                        ...Object.values(choice.nameLocalizations).map((value) => value.length),
                      )
                      : choice.name.length)
                  ).reduce((prev, curr) => prev + curr)
                  : 0) +
                (option.options
                  ? option.options.map((option) =>
                    (option.nameLocalizations
                      ? Math.max(
                        option.name.length,
                        ...Object.values(option.nameLocalizations).map((value) => value.length),
                      )
                      : option.name.length) +
                    (option.descriptionLocalizations
                      ? Math.max(
                        option.description.length,
                        ...Object.values(option.descriptionLocalizations).map((value) => value.length),
                      )
                      : option.description.length) +
                    (option.choices
                      ? option.choices.map((choice) =>
                        choice.value.toString().length +
                        (choice.nameLocalizations
                          ? Math.max(
                            choice.name.length,
                            ...Object.values(choice.nameLocalizations).map((value) => value.length),
                          )
                          : choice.name.length)
                      ).reduce((prev, curr) => prev + curr)
                      : 0)
                  ).reduce((prev, curr) => prev + curr)
                  : 0)
              ).reduce((prev, curr) => prev + curr)
              : 0)
          ).reduce((prev, curr) => prev + curr)
          : 0);

      if (length > 4000) {
        throw new Error(
          "Slash commands can have a maximum of 4000 characters for combined name, description, and value properties for each command, its options (including subcommands and groups), and choices. When localization fields are present, only the longest localization for each field (including the default value) is counted towards the size limit.",
        );
      }
    } else {
      if (!CONTEXT_MENU_COMMANDS_NAME_REGEX.test(options.name)) {
        throw new Error(
          "The name of the context menu did not match the required regex.",
        );
      }

      const length = (options.nameLocalizations
        ? Math.max(
          options.name.length,
          ...Object.values(options.nameLocalizations).map((value) => value.length),
        )
        : options.name.length);

      if (length > 4000) {
        throw new Error(
          "Slash commands can have a maximum of 4000 characters for combined name, description, and value properties for each command, its options (including subcommands and groups), and choices. When localization fields are present, only the longest localization for each field (including the default value) is counted towards the size limit.",
        );
      }
    }

    return await createApplicationCommandOld(options, guildId);
  };
}

export function editInteractionResponse(bot: BotWithCache) {
  const editInteractionResponseOld = bot.helpers.editInteractionResponse;

  bot.helpers.editInteractionResponse = async function (token, options) {
    if (options.content && options.content.length > 2000) {
      throw Error(bot.constants.Errors.MESSAGE_MAX_LENGTH);
    }

    if (options.embeds && options.embeds.length > 10) {
      options.embeds.splice(10);
    }

    if (options.allowedMentions) {
      if (options.allowedMentions.users?.length) {
        if (
          options.allowedMentions.parse?.includes(
            AllowedMentionsTypes.UserMentions,
          )
        ) {
          options.allowedMentions.parse = options.allowedMentions.parse.filter((
            p,
          ) => p !== "users");
        }

        if (options.allowedMentions.users.length > 100) {
          options.allowedMentions.users = options.allowedMentions.users.slice(
            0,
            100,
          );
        }
      }

      if (options.allowedMentions.roles?.length) {
        if (
          options.allowedMentions.parse?.includes(
            AllowedMentionsTypes.RoleMentions,
          )
        ) {
          options.allowedMentions.parse = options.allowedMentions.parse.filter((
            p,
          ) => p !== "roles");
        }

        if (options.allowedMentions.roles.length > 100) {
          options.allowedMentions.roles = options.allowedMentions.roles.slice(
            0,
            100,
          );
        }
      }
    }

    if (options.attachments) validateAttachments(bot, options.attachments);

    return await editInteractionResponseOld(token, options);
  };
}

export default function setupInteractionCommandPermChecks(bot: BotWithCache) {
  createApplicationCommand(bot);
  editInteractionResponse(bot);
}
