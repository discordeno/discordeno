// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
// on npm.
// https://deno.land/std@0.153.0/fmt/colors.ts?source

export interface Code {
  open: string;
  close: string;
  regexp: RegExp;
}

let enabled = true;

/**
 * Set changing text color to enabled or disabled
 * @param value
 */
export function setColorEnabled(value: boolean) {
  enabled = value;
}

/** Get whether text color change is enabled or disabled. */
export function getColorEnabled(): boolean {
  return enabled;
}

/**
 * Builds color code
 * @param open
 * @param close
 */
function code(open: number[], close: number): Code {
  return {
    open: `\x1b[${open.join(';')}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, 'g'),
  };
}

/**
 * Applies color and background based on color code and its associated text
 * @param str text to apply color settings to
 * @param code color code to apply
 */
function run(str: string, code: Code): string {
  return enabled ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}` : str;
}

/**
 * Make the text bold.
 * @param str text to make bold
 */
export function bold(str: string): string {
  return run(str, code([1], 22));
}

/**
 * Make the text italic.
 * @param str text to make italic
 */
export function italic(str: string): string {
  return run(str, code([3], 23));
}

/**
 * Set text color to black.
 * @param str text to make black
 */
export function black(str: string): string {
  return run(str, code([30], 39));
}

/**
 * Set text color to red.
 * @param str text to make red
 */
export function red(str: string): string {
  return run(str, code([31], 39));
}

/**
 * Set text color to yellow.
 * @param str text to make yellow
 */
export function yellow(str: string): string {
  return run(str, code([33], 39));
}

/**
 * Set text color to cyan.
 * @param str text to make cyan
 */
export function cyan(str: string): string {
  return run(str, code([36], 39));
}

/**
 * Set text color to bright black.
 * @param str text to make bright-black
 */
export function gray(str: string): string {
  return run(str, code([90], 39));
}

/**
 * Set background color to bright magenta.
 * @param str text to make its background bright-magenta
 */
export function bgBrightMagenta(str: string): string {
  return run(str, code([105], 49));
}
