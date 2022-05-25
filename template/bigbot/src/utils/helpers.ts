import { User } from "../../deps.ts";
import { Milliseconds } from "../constants/milliseconds.ts";

export function chooseRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)]!;
}

export function getUserTag(user: User) {
  return `${user.username}#${user.discriminator}`;
}

export function toTitleCase(text: string) {
  return text
    .split(" ")
    .map((
      word,
    ) => (word[0] ? `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}` : word))
    .join(" ");
}

/** This function should be used when you want to convert milliseconds to a human readable format like 1d5h. */
export function humanizeMilliseconds(milliseconds: number) {
  const years = Math.floor(milliseconds / Milliseconds.Year);
  const months = Math.floor(
    (milliseconds % Milliseconds.Year) / Milliseconds.Month,
  );
  const weeks = Math.floor(
    ((milliseconds % Milliseconds.Year) % Milliseconds.Month) /
      Milliseconds.Week,
  );
  const days = Math.floor(
    (((milliseconds % Milliseconds.Year) % Milliseconds.Month) %
      Milliseconds.Week) / Milliseconds.Day,
  );
  const hours = Math.floor(
    ((((milliseconds % Milliseconds.Year) % Milliseconds.Month) %
      Milliseconds.Week) % Milliseconds.Day) /
      Milliseconds.Hour,
  );
  const minutes = Math.floor(
    (((((milliseconds % Milliseconds.Year) % Milliseconds.Month) %
      Milliseconds.Week) % Milliseconds.Day) %
      Milliseconds.Hour) /
      Milliseconds.Minute,
  );
  const seconds = Math.floor(
    ((((((milliseconds % Milliseconds.Year) % Milliseconds.Month) %
      Milliseconds.Week) % Milliseconds.Day) %
      Milliseconds.Hour) %
      Milliseconds.Minute) /
      Milliseconds.Second,
  );

  const YearString = years ? `${years}y ` : "";
  const monthString = months ? `${months}mo ` : "";
  const weekString = weeks ? `${weeks}w ` : "";
  const dayString = days ? `${days}d ` : "";
  const hourString = hours ? `${hours}h ` : "";
  const minuteString = minutes ? `${minutes}m ` : "";
  const secondString = seconds ? `${seconds}s ` : "";

  return (
    `${YearString}${monthString}${weekString}${dayString}${hourString}${minuteString}${secondString}`
      .trimEnd() || "1s"
  );
}

/** This function helps convert a string like 1d5h to milliseconds. */
export function stringToMilliseconds(text: string) {
  const matches = text.match(/\d+(y|mo|w|d|h|m|s){1}/gi);
  if (!matches) return;

  let total = 0;

  for (const match of matches) {
    // Finds the first of these letters
    const validMatch = /(y|mo|w|d|h|m|s)/.exec(match);
    // if none of them were found cancel
    if (!validMatch) return;
    // Get the number which should be before the index of that match
    const number = match.substring(0, validMatch.index);
    // Get the letter that was found
    const [letter] = validMatch;
    if (!number || !letter) return;

    let multiplier = Milliseconds.Second;
    switch (letter.toLowerCase()) {
      case "y":
        multiplier = Milliseconds.Year;
        break;
      case "mo":
        multiplier = Milliseconds.Month;
        break;
      case "w":
        multiplier = Milliseconds.Week;
        break;
      case "d":
        multiplier = Milliseconds.Day;
        break;
      case "h":
        multiplier = Milliseconds.Hour;
        break;
      case "m":
        multiplier = Milliseconds.Minute;
        break;
    }

    const amount = number ? parseInt(number, 10) : undefined;
    if (!amount) return;

    total += amount * multiplier;
  }

  return total;
}

export function chunkStrings(
  array: string[],
  size = 2000,
  lineSeparator = "\n",
) {
  const responses: string[] = [];
  let response = "";
  for (const text of array) {
    const nextText = response.length && lineSeparator ? `${lineSeparator}${text}` : text;
    if (response.length + nextText.length >= size) {
      responses.push(response);
      response = "";
    }
    response += nextText;
  }
  responses.push(response);
  return responses;
}

export const timestamps = {
  ShortTime: "t",
  LongTime: "T",
  ShortDate: "d",
  LongDate: "D",
  ShortDateTime: "f",
  LongDateTime: "F",
  Relative: "R",
} as const;

export function snowflakeToTimestamp(id: bigint) {
  return Number(id / 4194304n + 1420070400000n);
}
