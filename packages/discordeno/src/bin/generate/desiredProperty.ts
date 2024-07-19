import type { DiscordenoConfig } from '../config.js'

/** Mapping to all the dependencies a specific getter has */
const computedDesiredProprieties = {
  channel: {
    archived: ['toggles'],
    invitable: ['toggles'],
    locked: ['toggles'],
    nsfw: ['toggles'],
    newlyCreated: ['toggles'],
    managed: ['toggles'],
    threadMetadata: ['toggles', 'archiveTimestamp', 'createTimestamp', 'autoArchiveDuration'],
  },
  guild: {
    threads: ['channels'],
    features: ['toggles'],
  },
  interaction: {
    respond: ['type', 'token', 'id'],
    edit: ['type', 'token', 'id'],
    deferEdit: ['type', 'token', 'id'],
    defer: ['type', 'token', 'id'],
    delete: ['type', 'token'],
  },
  member: {
    deaf: ['toggles'],
    mute: ['toggles'],
    pending: ['toggles'],
    flags: ['toggles'],
    didRejoin: ['toggles'],
    startedOnboarding: ['toggles'],
    bypassesVerification: ['toggles'],
    completedOnboarding: ['toggles'],
  },
  message: {
    crossposted: ['flags'],
    ephemeral: ['flags'],
    failedToMentionSomeRolesInThread: ['flags'],
    hasThread: ['flags'],
    isCrosspost: ['flags'],
    loading: ['flags'],
    mentionedUserIds: ['mentions'],
    mentionEveryone: ['bitfield'],
    pinned: ['bitfield'],
    sourceMessageDeleted: ['flags'],
    suppressEmbeds: ['flags'],
    suppressNotifications: ['flags'],
    timestamp: ['id'],
    tts: ['bitfield'],
    urgent: ['flags'],
  },
  role: {
    tags: ['tags', 'toggles'],
    hoist: ['toggles'],
    managed: ['toggles'],
    mentionable: ['toggles'],
    premiumSubscriber: ['toggles'],
    availableForPurchase: ['toggles'],
    guildConnections: ['toggles'],
  },
  user: {
    tag: ['username', 'discriminator'],
    bot: ['toggles'],
    system: ['toggles'],
    mfaEnabled: ['toggles'],
    verified: ['toggles'],
  },
}

export function isPropertyDesired(config: DiscordenoConfig, interfaceName: string, memberName: string): boolean {
  const desiredProperties = config.desiredProperties.properties

  const name = pascalCaseToCamelCase(interfaceName)

  const interfaceProps = desiredProperties[name as keyof typeof desiredProperties]
  const computedProps = computedDesiredProprieties[name as keyof typeof computedDesiredProprieties]

  // This interface does not support desired proprieties, so we include them
  if (!interfaceProps) {
    return true
  }

  const isPropDesired = interfaceProps[memberName as keyof typeof interfaceProps] ?? false

  // If this interface has some computed props, and this member is one of the ones that is in fact computed, check it's dependencies
  if (computedProps) {
    const dependencies: string[] = computedProps[memberName as keyof typeof computedProps]

    if (dependencies) {
      return dependencies.every((x) => {
        // To avoid an infinite loop we need to check that we don't call isPropertyDesired on this same member
        if (x === memberName) return isPropDesired

        return isPropertyDesired(config, interfaceName, x)
      })
    }
  }

  return isPropDesired
}

export function getPropertyDependencies(interfaceName: string, memberName: string): string[] | undefined {
  const name = pascalCaseToCamelCase(interfaceName)
  const computedProps = computedDesiredProprieties[name as keyof typeof computedDesiredProprieties]

  if (!computedProps) return undefined

  return computedProps[memberName as keyof typeof computedProps]
}

function pascalCaseToCamelCase(str: string) {
  if (str.length === 0) return str

  return `${str[0].toLowerCase()}${str.slice(1)}`
}
