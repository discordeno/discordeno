/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import fs from 'fs'

// TODO: replace with fetch of live spec
const DISCORD_SPEC = {}

function schemaRefToName(ref) {
  if (!ref) return ''
  return `Discord${ref?.substring(ref.lastIndexOf('/') + 1)}`
}

function snakeToPascalCase(str) {
  if (!str.includes('_')) return str

  let result = ''
  for (let i = 0, len = str.length; i < len; ++i) {
    if (str[i] === '_') {
      result += str[++i].toUpperCase()

      continue
    }

    result += str[i]
  }

  return result
}

function generateFromSpec() {
  const finalTypings = []

  for (const [key, schema] of Object.entries(DISCORD_SPEC.components.schemas)) {
    const interfacey = [`export interface Discord${key} {`]

    if (schema.properties) {
      for (const [name, property] of Object.entries(schema.properties)) {
        const type = Array.isArray(property.type) ? property.type : property.type ? [property.type] : undefined
        let ref = property.$ref && schemaRefToName(property.$ref)
        let allOf = property.allOf?.find((a) => a.$ref)
        if (allOf) {
          allOf = schemaRefToName(allOf.$ref)
        }

        const isArray = property.type === 'array'
        if (isArray) {
          if (property.items.$ref) ref = schemaRefToName(property.items.$ref)
          else if (Array.isArray(property.oneOf)) {
            ref = property.oneOf.map((o) => schemaRefToName(o.$ref)).join(' | ')
          }
        }

        if (property.description) {
          interfacey.push(`    /** ${property.description} */`)
        }

        let cleanType =
          ref ??
          allOf ??
          type
            ?.map((type) =>
              type === 'integer'
                ? 'number'
                : type === 'array'
                  ? property.items.$ref
                    ? `${schemaRefToName(property.items.$ref)}[]`
                    : Array.isArray(property.items.oneOf)
                      ? `${property.items.oneOf.map((o) => `${schemaRefToName(o.$ref)}[]`).join(' | ')}`
                      : `unknown[]`
                  : type,
            )
            .join(' | ') ??
          property.oneOf
            ?.map(
              (o) =>
                (o.type
                  ? o.type === 'integer'
                    ? o.enum
                      ? o.allOf.map((a) => schemaRefToName(a.$ref)).join(' | ')
                      : 'number'
                    : o.type
                  : undefined) ?? schemaRefToName(o.$ref),
            )
            .join(' | ') ??
          'unknown'

        if (cleanType.startsWith('null | ')) cleanType = cleanType.substring(cleanType.indexOf('|') + 2) + ' | null'
        interfacey.push(`    ${name}${schema.required?.includes(name) ? ':' : '?:'} ${cleanType}`)
      }
    } else {
      // No properties so is enum
      if (['integer', 'string'].includes(schema.type) && Array.isArray(schema.oneOf)) {
        const enumm = [`export enum Discord${key} {`]
        for (const possible of schema.oneOf) {
          if (possible.description) enumm.push(`    /** ${possible.description} */`)
          // TODO: camel case the title
          enumm.push(
            `    ${possible.title.includes('-') ? '"' : ''}${snakeToPascalCase(
              `${possible.title[0].toUpperCase()}${possible.title.substring(1).toLowerCase()}`,
            )}${possible.title.includes('-') ? '"' : ''} = ${schema.type === 'string' ? '"' : ''}${possible.const}${
              schema.type === 'string' ? '"' : ''
            },`,
          )
        }
        enumm.push('}')

        finalTypings.push(enumm.join('\n'))
        continue
      }

      console.log('NO PROPERTIES', key, schema)
      continue
    }

    interfacey.push('}')

    finalTypings.push(interfacey.join('\n'))
  }

  fs.writeFileSync('./packages/types/src/discord.ts', finalTypings.join('\n\n'), function (err, _result) {
    if (err) throw err
  })
}

generateFromSpec()
