import { type TransformersDesiredProprieties, createDesiredProprietiesObject } from '@discordeno/bot'
import type { RecursivePartial } from '@discordeno/types'
import { findUp } from 'find-up'

export enum DesiredProprietiesBehavior {
  Remove,
  TypeAsNever,
}

// TODO: all this stuff should be in a function and provably on the command itself, not here
const configFile = await findUp('discordeno.config.js', { allowSymlinks: true, type: 'file' })

if (!configFile) throw new Error('Could not find the config file')

const configModule = await import(configFile)

if (!configModule.default) throw new Error('The config file does not provide a default export')

export const desiredProprietiesBehavior: DesiredProprietiesBehavior = configModule.default.desiredProperties.behavior

export function isProprietyDesired(interfaceName: string, memberName: string): boolean {
  const desiredProprieties = configModule.default.desiredProperties.properties
  const interfaceProps = desiredProprieties[pascalCaseToCamelCase(interfaceName) as keyof typeof desiredProprieties]

  // This interface does not support desired proprieties, so we include them
  if (!interfaceProps) {
    return true
  }

  return interfaceProps[memberName as keyof typeof interfaceProps] ?? false
}

export function defineConfig(config: RecursivePartial<DiscordenoConfig>): DiscordenoConfig {
  return {
    desiredProperties: {
      behavior: config.desiredProperties?.behavior ?? DesiredProprietiesBehavior.TypeAsNever,
      properties: createDesiredProprietiesObject(config.desiredProperties?.properties ?? {}),
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
