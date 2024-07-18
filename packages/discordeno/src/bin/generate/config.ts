import { type TransformersDesiredProprieties, createDesiredProprietiesObject } from '@discordeno/bot'
import type { RecursivePartial } from '@discordeno/types'

export enum DesiredProprietiesBehavior {
  Remove,
  TypeAsNever,
}

// TODO: source these values from the config file
const config = defineConfig({
  desiredProperties: {
    behavior: DesiredProprietiesBehavior.TypeAsNever,
    properties: {
      message: {
        id: true,
      },
    },
  },
})

export const desiredProprietiesBehavior: DesiredProprietiesBehavior = config.desiredProperties.behavior

export function isProprietyDesired(interfaceName: string, memberName: string): boolean {
  const interfaceProps = config.desiredProperties.properties[pascalCaseToCamelCase(interfaceName) as keyof typeof config.desiredProperties.properties]

  // This interface does not support desired proprieties, so we include them
  if (!interfaceProps) {
    return true
  }

  return interfaceProps[memberName as keyof typeof interfaceProps] ?? false
}

export function defineConfig(config: DiscordenoConfig): DiscordenoConfig {
  return {
    desiredProperties: {
      behavior: config.desiredProperties.behavior,
      properties: createDesiredProprietiesObject(config.desiredProperties.properties),
    },
  }
}

function pascalCaseToCamelCase(str: string) {
  if (str.length === 0) return str

  return `${str[0].toLowerCase()}${str.slice(1)}`
}

export interface DiscordenoConfig {
  desiredProperties: {
    behavior: DesiredProprietiesBehavior
    properties: RecursivePartial<TransformersDesiredProprieties>
  }
}
