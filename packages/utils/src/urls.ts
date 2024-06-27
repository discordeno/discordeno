import type { BigString } from '@discordeno/types'

export function skuLink(appId: BigString, skuId: BigString): string {
  return `https://discord.com/application-directory/${appId}/store/${skuId}`
}

export function storeLink(appId: BigString): string {
  return `https://discord.com/application-directory/${appId}/store`
}
