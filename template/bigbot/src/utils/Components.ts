import { ActionRow, ButtonStyles, MessageComponentTypes } from "../../deps.ts";
import { SNOWFLAKE_REGEX } from "../constants/regexes.ts";

export class Components extends Array<ActionRow> {
  constructor(...args: ActionRow[]) {
    super(...args);

    return this;
  }

  addActionRow() {
    // Don't allow more than 5 Action Rows
    if (this.length === 5) return this;

    this.push({
      type: 1,
      components: [] as unknown as ActionRow["components"],
    });
    return this;
  }

  addButton(
    label: string,
    style: keyof typeof ButtonStyles,
    customIdOrLink: string,
    options?: { emoji?: string | bigint; disabled?: boolean },
  ) {
    // No Action Row has been created so do it
    if (!this.length) this.addActionRow();

    // Get the last Action Row
    let row = this[this.length - 1];

    // If the Action Row already has 5 buttons create a new one
    if (row.components.length === 5) {
      this.addActionRow();
      row = this[this.length - 1];

      // Apparently there are already 5 Full Action Rows so don't add the button
      if (row.components.length === 5) return this;
    }

    row.components.push({
      type: MessageComponentTypes.Button,
      label: label,
      customId: style !== "Link" ? customIdOrLink : undefined,
      style: ButtonStyles[style],
      emoji: this.#stringToEmoji(options?.emoji),
      url: style === "Link" ? customIdOrLink : undefined,
      disabled: options?.disabled,
    });
    return this;
  }

  #stringToEmoji(emoji?: string | bigint) {
    if (!emoji) return;

    emoji = emoji.toString();

    // A snowflake id was provided
    if (SNOWFLAKE_REGEX.test(emoji)) {
      return {
        id: BigInt(emoji.match(SNOWFLAKE_REGEX)![0]),
      };
    }

    // A unicode emoji was provided
    return {
      name: emoji,
    };
  }
}
