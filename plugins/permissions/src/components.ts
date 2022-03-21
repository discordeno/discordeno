import { Bot, ButtonStyles, Emoji, MessageComponents, MessageComponentTypes } from "../deps.ts";

export function validateComponents(bot: Bot, components: MessageComponents) {
  if (!components?.length) return;

  let actionRowCounter = 0;

  for (const component of components) {
    actionRowCounter++;
    // Max of 5 ActionRows per message
    if (actionRowCounter > 5) throw new Error("Too many action rows.");

    // Max of 5 Buttons (or any component type) within an ActionRow
    if (component.components?.length > 5) {
      throw new Error("Too many components.");
    } else if (
      component.components?.length > 1 &&
      component.components.some((subcomponent) => subcomponent.type === MessageComponentTypes.SelectMenu)
    ) {
      throw new Error("Select component must be alone.");
    }

    for (const subcomponent of component.components) {
      if (
        subcomponent.customId &&
        !bot.utils.validateLength(subcomponent.customId, { max: 100 })
      ) {
        throw new Error("The custom id in the component is too big.");
      }

      // 5 Link buttons can not have a customId
      if (subcomponent.type === MessageComponentTypes.Button) {
        if (subcomponent.style === ButtonStyles.Link && subcomponent.customId) {
          throw new Error("Link buttons can not have custom ids.");
        }
        // Other buttons must have a customId
        if (
          !subcomponent.customId && subcomponent.style !== ButtonStyles.Link
        ) {
          throw new Error(
            "The button requires a custom id if it is not a link button.",
          );
        }

        if (!bot.utils.validateLength(subcomponent.label, { max: 80 })) {
          throw new Error("The label can not be longer than 80 characters.");
        }

        subcomponent.emoji = makeEmojiFromString(subcomponent.emoji);
      }

      if (subcomponent.type === MessageComponentTypes.SelectMenu) {
        if (
          subcomponent.placeholder &&
          !bot.utils.validateLength(subcomponent.placeholder, { max: 150 })
        ) {
          throw new Error(
            "The component placeholder can not be longer than 150 characters.",
          );
        }

        if (subcomponent.minValues) {
          if (subcomponent.minValues < 1) {
            throw new Error(
              "The min values must be more than 1 in a select component.",
            );
          }

          if (subcomponent.minValues > 25) {
            throw new Error(
              "The min values must be less than 25 in a select component.",
            );
          }

          if (!subcomponent.maxValues) {
            subcomponent.maxValues = subcomponent.minValues;
          }
          if (subcomponent.minValues > subcomponent.maxValues) {
            throw new Error(
              "The select component can not have a min values higher than a max values.",
            );
          }
        }

        if (subcomponent.maxValues) {
          if (subcomponent.maxValues < 1) {
            throw new Error(
              "The max values must be more than 1 in a select component.",
            );
          }

          if (subcomponent.maxValues > 25) {
            throw new Error(
              "The max values must be less than 25 in a select component.",
            );
          }
        }

        if (subcomponent.options.length < 1) {
          throw new Error("You need atleast 1 option in the select component.");
        }

        if (subcomponent.options.length > 25) {
          throw new Error(
            "You can not have more than 25 options in the select component.",
          );
        }

        let defaults = 0;

        for (const option of subcomponent.options) {
          if (option.default) {
            defaults++;
            if (defaults > (subcomponent.maxValues || 25)) {
              throw new Error("You chose too many default options.");
            }
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
