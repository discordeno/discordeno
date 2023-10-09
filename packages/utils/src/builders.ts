import { EmbedsBuilder } from './builders/embeds.js'

export * from './builders/embeds.js'

export const createEmbeds = (): EmbedsBuilder => new EmbedsBuilder()
