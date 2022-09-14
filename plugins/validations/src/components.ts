import { Bot, ButtonStyles, Emoji, MessageComponents, MessageComponentTypes } from "../deps.ts";

export function validateComponents(bot: Bot, components: MessageComponents) {
  if (!components?.length) return;

  let actionRowCounter = 0;

  for (const component of components) {
    actionRowCounter++;
    // Max of 5 ActionRows per message
    if (actionRowCounter > 5) throw new Error("Too many action rows.");

    // Max of 5 Buttons (or any component type) within an ActionRow
    if (component.components?.length > 5) throw new Error("Too many components.");
    else if (
      component.components?.length > 1 &&
      component.components.some((subComponent) => subComponent.type === MessageComponentTypes.SelectMenu)
    ) {
      throw new Error("Select component must be alone.");
    }

    for (const subComponent of component.components) {
      if (
        subComponent.customId &&
        !bot.utils.validateLength(subComponent.customId, { max: 100 })
      ) {
        throw new Error("The custom id in the component is too big.");
      }

      // 5 Link buttons can not have a customId
      if (subComponent.type === MessageComponentTypes.Button) {
        if (subComponent.style === ButtonStyles.Link && subComponent.customId) {
          throw new Error("Link buttons can not have custom ids.");
        }
        // Other buttons must have a customId
        if (
          !subComponent.customId && subComponent.style !== ButtonStyles.Link
        ) {
          throw new Error(
            "The button requires a custom id if it is not a link button.",
          );
        }

        if (!bot.utils.validateLength(subComponent.label, { max: 80 })) {
          throw new Error("The label can not be longer than 80 characters.");
        }

        subComponent.emoji = makeEmojiFromString(subComponent.emoji);
      }

      if (subComponent.type === MessageComponentTypes.SelectMenu) {
        if (
          subComponent.placeholder &&
          !bot.utils.validateLength(subComponent.placeholder, { max: 150 })
        ) {
          throw new Error(
            "The component placeholder can not be longer than 150 characters.",
          );
        }

        if (subComponent.minValues) {
          if (subComponent.minValues < 1) {
            throw new Error(
              "The min values must be more than 1 in a select component.",
            );
          }

          if (subComponent.minValues > 25) {
            throw new Error(
              "The min values must be less than 25 in a select component.",
            );
          }

          if (!subComponent.maxValues) subComponent.maxValues = subComponent.minValues;
          if (subComponent.minValues > subComponent.maxValues) {
            throw new Error(
              "The select component can not have a min values higher than a max values.",
            );
          }
        }

        if (subComponent.maxValues) {
          if (subComponent.maxValues < 1) {
            throw new Error(
              "The max values must be more than 1 in a select component.",
            );
          }

          if (subComponent.maxValues > 25) {
            throw new Error(
              "The max values must be less than 25 in a select component.",
            );
          }
        }

        if (subComponent.options.length < 1) throw new Error("You need at least 1 option in the select component.");

        if (subComponent.options.length > 25) {
          throw new Error(
            "You can not have more than 25 options in the select component.",
          );
        }

        let defaults = 0;

        for (const option of subComponent.options) {
          if (option.default) {
            defaults++;
            if (defaults > (subComponent.maxValues || 25)) throw new Error("You chose too many default options.");
          }

          if (!bot.utils.validateLength(option.label, { max: 25 })) {
            throw new Error(
              "The select component label can not exceed 25 characters.",
            );
          }

          if (!bot.utils.validateLength(option.value, { max: 100 })) {
            throw new Error(
              "The select component value can not exceed 100 characters.",
            );
          }

          if (
            option.description &&
            !bot.utils.validateLength(option.description, { max: 50 })
          ) {
            throw new Error(
              "The select option description can not exceed 50 characters.",
            );
          }

          option.emoji = makeEmojiFromString(option.emoji);
        }
      }

      if (subComponent.type === MessageComponentTypes.InputText) {
        // Other buttons must have a customId
        if (
          !subComponent.customId
        ) {
          throw new Error(
            "The text input requires a custom id",
          );
        }

        if (!bot.utils.validateLength(subComponent.label, { max: 45 })) {
          throw new Error("The label can not be longer than 45 characters.");
        }

        if (subComponent.minLength) {
          if (subComponent.minLength < 0) {
            throw new Error(
              "The min length must be more than 0 in a text input component.",
            );
          }

          if (subComponent.minLength > 4000) {
            throw new Error(
              "The min length must be less than 4000 in a text input component.",
            );
          }

          if (subComponent.maxLength && subComponent.minLength > subComponent.maxLength) {
            throw new Error(
              "The text input component can not have a higher min length than the max length.",
            );
          }
        }

        if (subComponent.maxLength) {
          if (subComponent.maxLength < 1) {
            throw new Error(
              "The max length must be more than 1 in a text input component.",
            );
          }

          if (subComponent.maxLength > 4000) {
            throw new Error(
              "The max length must be less than 4000 in a text input component.",
            );
          }
        }
      }
    }
  }
}

function makeEmojiFromString(
  emoji?:
    | string
    | {
      id?: string | bigint | undefined;
      name?: string | undefined;
      animated?: boolean | undefined;
    },
) {
  if (!emoji) return;

  if (typeof emoji !== "string") {
    return {
      id: emoji.id ? BigInt(emoji.id) : undefined,
      name: emoji.name,
      animated: emoji.animated,
    };
  }

  // A snowflake id was provided
  if (/^[0-9]+$/.test(emoji)) {
    emoji = {
      id: BigInt(emoji),
    };
  } else {
    // A unicode emoji was provided
    emoji = {
      name: emoji,
    };
  }

  return emoji as Emoji;
}
