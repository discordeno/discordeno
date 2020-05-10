import {
  blue,
  green,
  red,
  yellow,
} from "https://deno.land/std@0.50.0/fmt/colors.ts";

export const getTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minute = now.getMinutes();

  let hour = hours;
  let amOrPm = `AM`;
  if (hour > 12) {
    amOrPm = `PM`;
    hour = hour - 12;
  }

  return `${hour >= 10 ? hour : `0${hour}`}:${
    minute >= 10 ? minute : `0${minute}`
  } ${amOrPm}`;
};

export const logGreen = (text: unknown) => {
  console.log(green(`[${getTime()}] => ${JSON.stringify(text)}`));
};

export const logBlue = (text: unknown) => {
  console.log(blue(`[${getTime()}] => ${JSON.stringify(text)}`));
};

export const logRed = (text: unknown) => {
  console.log(red(`[${getTime()}] => ${JSON.stringify(text)}`));
};

export const logYellow = (text: unknown) => {
  console.log(yellow(`[${getTime()}] => ${JSON.stringify(text)}`));
};
