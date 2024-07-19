import type { DiscordenoConfig } from '../config.js'

export function isProprietyDesired(config: DiscordenoConfig, interfaceName: string, memberName: string): boolean {
  const desiredProperties = config.desiredProperties.properties

  const interfaceProps = desiredProperties[pascalCaseToCamelCase(interfaceName) as keyof typeof desiredProperties]

  // This interface does not support desired proprieties, so we include them
  if (!interfaceProps) {
    return true
  }

  return interfaceProps[memberName as keyof typeof interfaceProps] ?? false
}

function pascalCaseToCamelCase(str: string) {
  if (str.length === 0) return str

  return `${str[0].toLowerCase()}${str.slice(1)}`
}
