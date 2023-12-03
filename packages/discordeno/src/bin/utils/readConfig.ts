import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { readPackageUp } from 'read-package-up'
import type { DiscordenoConfig } from '../types/DiscordenoConfig.js'

/**
 *
 * Credit: Primsa
 * https://github.com/prisma/prisma/blob/862ae2d428edf32fb1440563f6ed4759489c7f30/packages/internals/src/cli/getSchema.ts
 */

export const readConfig = async (): Promise<DiscordenoConfig> => {
  const configPath = await getConfigPath()
  if (configPath === null) {
    console.error('Error: No config found')
    process.exit(1)
  }
  return await readFile(configPath, 'utf-8').then((config) => JSON.parse(config) as DiscordenoConfig)
}

const getConfigPath = async (): Promise<string | null> => {
  const workDir = process.cwd()
  const pkgJson = await readPackageUp({ cwd: workDir })
  if (pkgJson?.packageJson?.discordeno) return pkgJson?.packageJson?.discordeno as string
  const possibleFileName = ['.discordenorc', '.discordenorc.json', 'discordenorc.js']
  const relativeConfigPath = await Promise.all(
    possibleFileName.map(
      async (filename) =>
        await readFile(path.join(workDir, filename), 'utf-8')
          .then(() => filename)
          .catch(() => null),
    ),
  )
  const firstRelativeConfigPath = relativeConfigPath.find((config) => config !== null)
  if (firstRelativeConfigPath) return firstRelativeConfigPath

  return null
}
