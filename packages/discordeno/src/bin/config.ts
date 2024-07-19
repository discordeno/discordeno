import { type TransformersDesiredProprieties, createDesiredProprietiesObject } from '@discordeno/bot'
import type { RecursivePartial } from '@discordeno/types'

export enum DesiredProprietiesBehavior {
  Remove,
  TypeAsNever,
}

export function defineConfig(config: RecursivePartial<DiscordenoConfig>): DiscordenoConfig {
  return {
    desiredProperties: {
      behavior: config.desiredProperties?.behavior ?? DesiredProprietiesBehavior.TypeAsNever,
      properties: createDesiredProprietiesObject(config.desiredProperties?.properties ?? {}),
    },
  }
}

export interface DiscordenoConfig {
  desiredProperties: {
    behavior: DesiredProprietiesBehavior
    properties: RecursivePartial<TransformersDesiredProprieties>
  }
}
