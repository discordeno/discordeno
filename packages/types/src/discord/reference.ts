/** Types for: https://discord.com/developers/docs/reference */

/**
 * https://discord.com/developers/docs/reference#image-formatting
 *
 * @remarks
 * json is only for stickers
 */
export type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'avif' | 'json';

/** https://discord.com/developers/docs/reference#image-formatting */
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;

/** https://discord.com/developers/docs/reference#locales */
export enum Locales {
  Indonesian = 'id',
  Danish = 'da',
  German = 'de',
  EnglishUk = 'en-GB',
  EnglishUs = 'en-US',
  Spanish = 'es-ES',
  SpanishLatam = 'es-419',
  French = 'fr',
  Croatian = 'hr',
  Italian = 'it',
  Lithuanian = 'lt',
  Hungarian = 'hu',
  Dutch = 'nl',
  Norwegian = 'no',
  Polish = 'pl',
  PortugueseBrazilian = 'pt-BR',
  RomanianRomania = 'ro',
  Finnish = 'fi',
  Swedish = 'sv-SE',
  Vietnamese = 'vi',
  Turkish = 'tr',
  Czech = 'cs',
  Greek = 'el',
  Bulgarian = 'bg',
  Russian = 'ru',
  Ukrainian = 'uk',
  Hindi = 'hi',
  Thai = 'th',
  ChineseChina = 'zh-CN',
  Japanese = 'ja',
  ChineseTaiwan = 'zh-TW',
  Korean = 'ko',
}

export type Localization = Partial<Record<Locales, string>>;
