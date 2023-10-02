import { EmbedsBuilder } from './builders/embeds.js';

export * from './builders/embeds.js';

export const builder = {
  embeds: () => new EmbedsBuilder()
}