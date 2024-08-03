import { unlink, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { type TransformersDesiredProperties, createDesiredPropertiesObject, gray } from '@discordeno/bot'
import type { RecursivePartial } from '@discordeno/types'
import { findUp } from 'find-up'
import ts from 'typescript'

export enum DesiredPropertiesBehavior {
  Remove,
  TypeAsNever,
}

export const typescriptOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.Node16,
  moduleResolution: ts.ModuleResolutionKind.Node16,
  skipLibCheck: true,
  skipDefaultLibCheck: true,
  strict: true,
}

export function defineConfig(config: RecursivePartial<DiscordenoConfig>): DiscordenoConfig {
  return {
    desiredProperties: {
      behavior: config.desiredProperties?.behavior ?? DesiredPropertiesBehavior.TypeAsNever,
      properties: createDesiredPropertiesObject(config.desiredProperties?.properties ?? {}),
    },
  }
}

export async function findConfig(path?: string): Promise<DiscordenoConfig> {
  const fileToSearch = path ?? ['discordeno.config.js', 'discordeno.config.mjs', 'discordeno.config.ts', 'discordeno.config.mts']

  const file = await findUp(fileToSearch, { allowSymlinks: true, type: 'file' })

  if (!file) {
    throw new Error('Could not find the config file, please pass the config file explicitly')
  }

  console.log(gray(`Found config file at: ${file}`))

  const module = await importConfig(file)
  const config = module.default

  if (!config || typeof config !== 'object') {
    throw new Error("The config could not be found or it isn't an object")
  }

  return config
}

async function importConfig(file: string) {
  if (!file.endsWith('.ts') && !file.endsWith('.mts')) {
    // We need to convert to a file:// url to prevent a nodejs error on Windows
    return import(pathToFileURL(file).href)
  }

  // for .ts files we need to build them, write them to disk (for relative imports) and then remove them

  const fileName = `${dirname(file)}/discordeno-${Date.now()}.config.mjs`

  try {
    await writeFile(fileName, buildConfig(file))

    // We need to convert to a file:// url to prevent a nodejs error on Windows
    return await import(pathToFileURL(fileName).href)
  } finally {
    await unlink(fileName)
  }
}

function buildConfig(path: string) {
  const createdFiles: Record<string, string> = {}

  const program = ts.createProgram([path], typescriptOptions)
  program.emit(undefined, (file, text) => (createdFiles[file] = text))

  const outFileName = path.replaceAll('\\', '/').replace(/\.m?[tj]s/i, '.js')
  return createdFiles[outFileName]
}

export interface DiscordenoConfig {
  desiredProperties: {
    behavior: DesiredPropertiesBehavior
    properties: TransformersDesiredProperties
  }
}
