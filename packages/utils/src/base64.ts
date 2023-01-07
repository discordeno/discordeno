/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation
 * @param data
 */
export function encode(data: ArrayBuffer | string): string {
  const uint8 = typeof data === 'string' ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data)
  let result = ''
  let i
  const l = uint8.length
  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2]
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)]
    result += base64abc[((uint8[i - 1] & 0x0f) << 2) | (uint8[i] >> 6)]
    result += base64abc[uint8[i] & 0x3f]
  }
  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[uint8[i - 2] >> 2]
    result += base64abc[(uint8[i - 2] & 0x03) << 4]
    result += '=='
  }
  if (i === l) {
    // 2 octets yet to write
    result += base64abc[uint8[i - 2] >> 2]
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)]
    result += base64abc[(uint8[i - 1] & 0x0f) << 2]
    result += '='
  }
  return result
}

/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Decodes RFC4648 base64 string into an Uint8Array
 * @param data
 */
export function decode(data: string): Uint8Array {
  if (data.length % 4 !== 0) {
    throw new Error('Unable to parse base64 string.')
  }
  const index = data.indexOf('=')
  if (index !== -1 && index < data.length - 2) {
    throw new Error('Unable to parse base64 string.')
  }
  const missingOctets = data.endsWith('==') ? 2 : data.endsWith('=') ? 1 : 0
  const n = data.length
  const result = new Uint8Array(3 * (n / 4))
  let buffer
  for (let i = 0, j = 0; i < n; i += 4, j += 3) {
    buffer =
      (getBase64Code(data.charCodeAt(i)) << 18) |
      (getBase64Code(data.charCodeAt(i + 1)) << 12) |
      (getBase64Code(data.charCodeAt(i + 2)) << 6) |
      getBase64Code(data.charCodeAt(i + 3))
    result[j] = buffer >> 16
    result[j + 1] = (buffer >> 8) & 0xff
    result[j + 2] = buffer & 0xff
  }
  return result.subarray(0, result.length - missingOctets)
}

/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * @param charCode
 */
function getBase64Code(charCode: number): number {
  if (charCode >= base64codes.length) {
    throw new Error('Unable to parse base64 string.')
  }
  const code = base64codes[charCode]
  if (code === 255) {
    throw new Error('Unable to parse base64 string.')
  }
  return code
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const base64abc = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '/',
]

// CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
const base64codes = [
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255,
  0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
]
