/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-const-assign */
import { calculateBits, camelToSnakeCase, camelize, delay, getBotIdFromToken, logger, processReactionString, urlToBase64, snakelize } from '@discordeno/utils'

import { createInvalidRequestBucket } from './invalidBucket.js'
import { Queue } from './queue.js'

import {
  InteractionResponseTypes,
  type BigString,
  type Camelize,
  type DiscordApplication,
  type DiscordApplicationCommand,
  type DiscordAuditLog,
  type DiscordAutoModerationRule,
  type DiscordBan,
  type DiscordChannel,
  type DiscordEmoji,
  type DiscordFollowedChannel,
  type DiscordGetGatewayBot,
  type DiscordGuild,
  type DiscordGuildApplicationCommandPermissions,
  type DiscordGuildPreview,
  type DiscordGuildWidget,
  type DiscordGuildWidgetSettings,
  type DiscordIntegration,
  type DiscordInvite,
  type DiscordInviteMetadata,
  type DiscordListActiveThreads,
  type DiscordListArchivedThreads,
  type DiscordMember,
  type DiscordMemberWithUser,
  type DiscordMessage,
  type DiscordPrunedCount,
  type DiscordRole,
  type DiscordScheduledEvent,
  type DiscordStageInstance,
  type DiscordSticker,
  type DiscordStickerPack,
  type DiscordTemplate,
  type DiscordThreadMember,
  type DiscordUser,
  type DiscordVanityUrl,
  type DiscordVoiceRegion,
  type DiscordWebhook,
  type DiscordWelcomeScreen,
  type MfaLevels,
  type ModifyGuildTemplate,
} from '@discordeno/types'
import { createRoutes } from './routes.js'
import type { CreateRequestBodyOptions, CreateRestManagerOptions, RestManager, SendRequestOptions } from './types.js'

// TODO: make dynamic based on package.json file
const version = '19.0.0-alpha.1'

export const DISCORD_API_VERSION = 10
export const DISCORD_API_URL = 'https://discord.com/api'

export const AUDIT_LOG_REASON_HEADER = 'x-audit-log-reason'
export const RATE_LIMIT_REMAINING_HEADER = 'x-ratelimit-remaining'
export const RATE_LIMIT_RESET_AFTER_HEADER = 'x-ratelimit-reset-after'
export const RATE_LIMIT_GLOBAL_HEADER = 'x-ratelimit-global'
export const RATE_LIMIT_BUCKET_HEADER = 'x-ratelimit-bucket'
export const RATE_LIMIT_LIMIT_HEADER = 'x-ratelimit-limit'
export const RATE_LIMIT_SCOPE_HEADER = 'x-ratelimit-scope'

export function createRestManager(options: CreateRestManagerOptions): RestManager {
  const applicationId = options.applicationId ? BigInt(options.applicationId) : options.token ? getBotIdFromToken(options.token) : undefined
  if (!applicationId) {
    throw new Error(
      '`applicationId` was not provided and was not able to extract the id from the bots token. Please explicitly pass `applicationId` to the rest manager.',
    )
  }

  const baseUrl = options.proxy?.baseUrl ?? DISCORD_API_URL

  const rest: RestManager = {
    applicationId,
    authorization: options.proxy?.authorization,
    baseUrl,
    deleteQueueDelay: 60000,
    globallyRateLimited: false,
    invalidBucket: createInvalidRequestBucket({}),
    isProxied: !baseUrl.startsWith(DISCORD_API_URL),
    maxRetryCount: Infinity,
    processingRateLimitedPaths: false,
    queues: new Map(),
    rateLimitedPaths: new Map(),
    token: options.token,
    version: options.version ?? DISCORD_API_VERSION,

    routes: createRoutes(),

    checkRateLimits(url) {
      const ratelimited = rest.rateLimitedPaths.get(url)
      const global = rest.rateLimitedPaths.get('global')
      const now = Date.now()

      if (ratelimited && now < ratelimited.resetTimestamp) {
        return ratelimited.resetTimestamp - now
      }

      if (global && now < global.resetTimestamp) {
        return global.resetTimestamp - now
      }

      return false
    },

    changeToDiscordFormat(obj: any): any {
      if (obj === null) return null

      if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
          return obj.map((item) => rest.changeToDiscordFormat(item))
        }

        const newObj: any = {}

        for (const key of Object.keys(obj)) {
          const value = obj[key]

          // Some falsy values should be allowed like null or 0
          if (value !== undefined) {
            switch (key) {
              case 'permissions':
              case 'allow':
              case 'deny':
                newObj[key] = typeof value === 'string' ? value : calculateBits(value)
                continue
              case 'defaultMemberPermissions':
                newObj.default_member_permissions = typeof value === 'string' ? value : calculateBits(value)
                continue
              case 'nameLocalizations':
                newObj.name_localizations = value
                continue
              case 'descriptionLocalizations':
                newObj.description_localizations = value
                continue
            }
          }

          newObj[camelToSnakeCase(key)] = rest.changeToDiscordFormat(value)
        }

        return newObj
      }

      if (typeof obj === 'bigint') return obj.toString()

      return obj
    },

    createRequestBody(method, options) {
      const headers: Record<string, string> = {
        'user-agent': `DiscordBot (https://github.com/discordeno/discordeno, v${version})`,
      }

      if (options?.unauthorized !== true) headers.authorization = `Bot ${rest.token}`

      // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
      if (options?.reason !== undefined) {
        headers[AUDIT_LOG_REASON_HEADER] = encodeURIComponent(options?.reason)
      }

      let body: string | FormData | undefined

      // TODO: check if we need to add specific check for GET method
      // Since GET does not allow bodies

      // Have to check for attachments first, since body then has to be send in a different way.
      if (options?.files !== undefined) {
        const form = new FormData()
        for (let i = 0; i < options.files.length; ++i) {
          form.append(`file${i}`, options.files[i].blob, options.files[i].name)
        }

        form.append('payload_json', JSON.stringify(snakelize({ ...options.body, files: undefined })))

        body = form

        // No need to set the `content-type` header since `fetch` does that automatically for us when we use a `FormData` object.
      } else if (options?.body !== undefined) {
        if (options.body instanceof FormData) {
          body = options.body
          // No need to set the `content-type` header since `fetch` does that automatically for us when we use a `FormData` object.
        } else {
          body = JSON.stringify(rest.changeToDiscordFormat(options.body))
          headers['content-type'] = `application/json`
        }
      }

      // SOMETIMES SPECIAL HEADERS (E.G. CUSTOM AUTHORIZATION) NEED TO BE USED
      if (options?.headers) {
        Object.assign(headers, options.headers)
      }

      return {
        body,
        headers,
        method,
      }
    },

    processRateLimitedPaths() {
      const now = Date.now()

      for (const [key, value] of rest.rateLimitedPaths.entries()) {
        //   rest.debug(
        // `[REST - processRateLimitedPaths] Running for of loop. ${
        //   value.resetTimestamp - now
        // }`
        //   )
        // If the time has not reached cancel
        if (value.resetTimestamp > now) continue

        // Rate limit is over, delete the rate limiter
        rest.rateLimitedPaths.delete(key)
        // If it was global, also mark the global value as false
        if (key === 'global') rest.globallyRateLimited = false
      }

      // ALL PATHS ARE CLEARED CAN CANCEL OUT!
      if (rest.rateLimitedPaths.size === 0) {
        rest.processingRateLimitedPaths = false
      } else {
        rest.processingRateLimitedPaths = true
        // RECHECK IN 1 SECOND
        setTimeout(() => {
          // rest.debug('[REST - processRateLimitedPaths] Running setTimeout.')
          rest.processRateLimitedPaths()
        }, 1000)
      }
    },

    /** Processes the rate limit headers and determines if it needs to be rate limited and returns the bucket id if available */
    processHeaders(url, headers) {
      let rateLimited = false

      // GET ALL NECESSARY HEADERS
      const remaining = headers.get(RATE_LIMIT_REMAINING_HEADER)
      const retryAfter = headers.get(RATE_LIMIT_RESET_AFTER_HEADER)
      const reset = Date.now() + Number(retryAfter) * 1000
      const global = headers.get(RATE_LIMIT_GLOBAL_HEADER)
      // undefined override null needed for typings
      const bucketId = headers.get(RATE_LIMIT_BUCKET_HEADER) ?? undefined
      const limit = headers.get(RATE_LIMIT_LIMIT_HEADER)

      rest.queues.get(url)?.handleCompletedRequest({
        remaining: remaining ? Number(remaining) : undefined,
        interval: retryAfter ? Number(retryAfter) * 1000 : undefined,
        max: limit ? Number(limit) : undefined,
      })

      // IF THERE IS NO REMAINING RATE LIMIT, MARK IT AS RATE LIMITED
      if (remaining === '0') {
        rateLimited = true

        // SAVE THE URL AS LIMITED, IMPORTANT FOR NEW REQUESTS BY USER WITHOUT BUCKET
        rest.rateLimitedPaths.set(url, {
          url,
          resetTimestamp: reset,
          bucketId,
        })

        // SAVE THE BUCKET AS LIMITED SINCE DIFFERENT URLS MAY SHARE A BUCKET
        if (bucketId) {
          rest.rateLimitedPaths.set(bucketId, {
            url,
            resetTimestamp: reset,
            bucketId,
          })
        }
      }

      // IF THERE IS NO REMAINING GLOBAL LIMIT, MARK IT RATE LIMITED GLOBALLY
      if (global) {
        const retryAfter = headers.get('retry-after')
        const globalReset = Date.now() + Number(retryAfter) * 1000
        //   rest.debug(
        // `[REST = Globally Rate Limited] URL: ${url} | Global Rest: ${globalReset}`
        //   )
        rest.globallyRateLimited = true
        rateLimited = true

        setTimeout(() => {
          rest.globallyRateLimited = false
        }, globalReset)

        rest.rateLimitedPaths.set('global', {
          url: 'global',
          resetTimestamp: globalReset,
          bucketId,
        })

        if (bucketId) {
          rest.rateLimitedPaths.set(bucketId, {
            url: 'global',
            resetTimestamp: globalReset,
            bucketId,
          })
        }
      }

      if (rateLimited && !rest.processingRateLimitedPaths) {
        rest.processRateLimitedPaths()
      }
      return rateLimited ? bucketId : undefined
    },

    async sendRequest(options) {
      const url = `${rest.baseUrl}/v${rest.version}${options.route}`
      const payload = rest.createRequestBody(options.method, options.requestBodyOptions)

      logger.debug(`sending request to ${url}`, 'with payload:', { ...payload, headers: { ...payload.headers, authorization: 'Bot tokenhere' } })
      const response = await fetch(url, payload).catch(async (error) => {
        logger.error(error)
        // Mark request and completed
        rest.invalidBucket.handleCompletedRequest(999, false)
        options.reject({
          ok: false,
          status: 999,
          error: 'Possible network or request shape issue occurred. If this is rare, its a network glitch. If it occurs a lot something is wrong.',
        })
        throw error
      })
      logger.debug(`request fetched from ${url} with status ${response.status} & ${response.statusText}`)

      // Mark request and completed
      rest.invalidBucket.handleCompletedRequest(response.status, response.headers.get(RATE_LIMIT_SCOPE_HEADER) === 'shared')

      // Set the bucket id if it was available on the headers
      const bucketId = rest.processHeaders(rest.simplifyUrl(options.route, options.method), response.headers)
      if (bucketId) options.bucketId = bucketId

      if (response.status < HttpResponseCode.Success || response.status >= HttpResponseCode.Error) {
        logger.debug(`Request to ${url} failed.`)

        if (response.status !== HttpResponseCode.TooManyRequests) {
          options.reject({ ok: false, status: response.status, body: await response.text() })
          return
        }

        logger.debug(`Request to ${url} was ratelimited.`)
        // Too many attempts, get rid of request from queue.
        if (options.retryCount >= rest.maxRetryCount) {
          logger.debug(`Request to ${url} exceeded the maximum allowed retries.`, 'with payload:', payload)
          // rest.debug(`[REST - RetriesMaxed] ${JSON.stringify(options)}`)
          options.reject({
            ok: false,
            status: response.status,
            error: 'The request was rate limited and it maxed out the retries limit.',
          })

          return
        }

        options.retryCount += 1

        const resetAfter = response.headers.get(RATE_LIMIT_RESET_AFTER_HEADER)
        if (resetAfter) await delay(Number(resetAfter) * 1000)
        // process the response to prevent mem leak
        await response.arrayBuffer()

        return await options.retryRequest?.(options)
      }

      // Discord sometimes sends no response with no content.
      options.resolve({ ok: true, status: response.status, body: response.status === HttpResponseCode.NoContent ? undefined : await response.text() })
    },

    simplifyUrl(url, method) {
      const parts = url.split('/')
      const secondLastPart = parts[parts.length - 2]

      if (secondLastPart === 'channels' || secondLastPart === 'guilds') {
        return url
      }

      if (secondLastPart === 'reactions' || parts[parts.length - 1] === '@me') {
        parts.splice(-2)
        parts.push('reactions')
      } else {
        parts.splice(-1)
        parts.push('x')
      }

      if (parts[parts.length - 3] === 'reactions') {
        parts.splice(-2)
      }

      if (method === 'DELETE' && secondLastPart === 'messages') {
        return `D${parts.join('/')}`
      }

      return parts.join('/')
    },

    async processRequest(request: SendRequestOptions) {
      const url = rest.simplifyUrl(request.route, request.method)

      if (request.runThroughQueue === false) {
        await rest.sendRequest(request)

        return
      }

      const queue = rest.queues.get(url)

      if (queue !== undefined) {
        queue.makeRequest(request)
      } else {
        // CREATES A NEW QUEUE
        const bucketQueue = new Queue(rest, { url, deleteQueueDelay: rest.deleteQueueDelay })

        // Add request to queue
        bucketQueue.makeRequest(request)
        // Save queue
        rest.queues.set(url, bucketQueue)
      }
    },

    async makeRequest(method, route, options) {
      if (rest.isProxied) {
        if (rest.authorization !== undefined) {
          options ??= {}
          options.headers ??= {}
          options.headers.authorization = rest.authorization
        }

        const result = await fetch(`${rest.baseUrl}/v${rest.version}${route}`, rest.createRequestBody(method, options))

        if (!result.ok) {
          const err = (await result.json().catch(() => {})) as Record<string, any>
          // Legacy Handling to not break old code or when body is missing
          if (!err?.body) throw new Error(`Error: ${err.message ?? result.statusText}`)
          throw new Error(JSON.stringify(err))
        }

        return result.status !== 204 ? await result.json() : undefined
      }

      // eslint-disable-next-line no-async-promise-executor
      return await new Promise(async (resolve, reject) => {
        const payload: SendRequestOptions = {
          route,
          method,
          requestBodyOptions: options,
          retryCount: 0,
          retryRequest: async function (payload: SendRequestOptions) {
            await rest.processRequest(payload)
          },
          resolve: (data) => {
            resolve(data.status !== 204 ? JSON.parse(data.body ?? '{}') : undefined)
          },
          reject,
          runThroughQueue: options?.runThroughQueue,
        }

        await rest.processRequest(payload)
      })
    },

    async get<T = Record<string, unknown>>(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return camelize(await rest.makeRequest('GET', url, options)) as Camelize<T>
    },

    async post<T = Record<string, unknown>>(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return camelize(await rest.makeRequest('POST', url, options)) as Camelize<T>
    },

    async delete(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      camelize(await rest.makeRequest('DELETE', url, options))
    },

    async patch<T = Record<string, unknown>>(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return camelize(await rest.makeRequest('PATCH', url, options)) as Camelize<T>
    },

    async put<T = void>(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return camelize(await rest.makeRequest('PUT', url, options)) as Camelize<T>
    },

    async addReaction(channelId, messageId, reaction) {
      reaction = processReactionString(reaction)

      await rest.put(rest.routes.channels.reactions.bot(channelId, messageId, reaction))
    },

    async addReactions(channelId, messageId, reactions, ordered = false) {
      if (!ordered) {
        await Promise.all(
          reactions.map(async (reaction) => {
            await rest.addReaction(channelId, messageId, reaction)
          }),
        )
        return
      }

      for (const reaction of reactions) {
        await rest.addReaction(channelId, messageId, reaction)
      }
    },

    async addRole(guildId, userId, roleId, reason) {
      await rest.put(rest.routes.guilds.roles.member(guildId, userId, roleId), { reason })
    },

    async addThreadMember(channelId, userId) {
      await rest.put(rest.routes.channels.threads.user(channelId, userId))
    },

    async createAutomodRule(guildId, body, reason) {
      return await rest.post<DiscordAutoModerationRule>(rest.routes.guilds.automod.rules(guildId), { body, reason })
    },

    async createChannel(guildId, body, reason) {
      return await rest.post<DiscordChannel>(rest.routes.guilds.channels(guildId), { body, reason })
    },

    async createEmoji(guildId, body, reason) {
      return await rest.post<DiscordEmoji>(rest.routes.guilds.emojis(guildId), { body, reason })
    },

    async createGlobalApplicationCommand(body) {
      return await rest.post<DiscordApplicationCommand>(rest.routes.interactions.commands.commands(rest.applicationId), { body })
    },

    async createGuild(body) {
      return await rest.post<DiscordGuild>(rest.routes.guilds.all(), { body })
    },

    async createGuildApplicationCommand(body, guildId) {
      return await rest.post<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId), { body })
    },

    async createGuildFromTemplate(templateCode, body) {
      if (body.icon) {
        body.icon = await urlToBase64(body.icon)
      }

      return await rest.post<DiscordGuild>(rest.routes.guilds.templates.code(templateCode), { body })
    },

    async createGuildSticker(guildId, options, reason) {
      const form = new FormData()
      form.append('file', options.file.blob, options.file.name)
      form.append('name', options.name)
      form.append('description', options.description)
      form.append('tags', options.tags)

      return await rest.post<DiscordSticker>(rest.routes.guilds.stickers(guildId), { body: form, reason })
    },

    async createGuildTemplate(guildId, body) {
      return await rest.post<DiscordTemplate>(rest.routes.guilds.templates.all(guildId), { body })
    },

    async createForumThread(channelId, body, reason) {
      return await rest.post<DiscordChannel>(rest.routes.channels.forum(channelId), { body, files: body.files, reason })
    },

    async createInvite(channelId, body = {}, reason) {
      return await rest.post<DiscordInvite>(rest.routes.channels.invites(channelId), { body, reason })
    },

    async createRole(guildId, body, reason) {
      return await rest.post<DiscordRole>(rest.routes.guilds.roles.all(guildId), { body, reason })
    },

    async createScheduledEvent(guildId, body, reason) {
      return await rest.post<DiscordScheduledEvent>(rest.routes.guilds.events.events(guildId), { body, reason })
    },

    async createStageInstance(body, reason) {
      return await rest.post<DiscordStageInstance>(rest.routes.channels.stages(), { body, reason })
    },

    async createWebhook(channelId, options, reason) {
      return await rest.post<DiscordWebhook>(rest.routes.channels.webhooks(channelId), {
        body: {
          name: options.name,
          avatar: options.avatar ? await urlToBase64(options.avatar) : undefined,
        },
        reason,
      })
    },

    async deleteAutomodRule(guildId, ruleId, reason) {
      await rest.delete(rest.routes.guilds.automod.rule(guildId, ruleId), { reason })
    },

    async deleteChannel(channelId, reason) {
      await rest.delete(rest.routes.channels.channel(channelId), {
        reason,
      })
    },

    async deleteChannelPermissionOverride(channelId, overwriteId, reason) {
      await rest.delete(rest.routes.channels.overwrite(channelId, overwriteId), { reason })
    },

    async deleteEmoji(guildId, id, reason) {
      await rest.delete(rest.routes.guilds.emoji(guildId, id), { reason })
    },

    async deleteFollowupMessage(token, messageId) {
      await rest.delete(rest.routes.interactions.responses.message(rest.applicationId, token, messageId), { unauthorized: true })
    },

    async deleteGlobalApplicationCommand(commandId) {
      await rest.delete(rest.routes.interactions.commands.command(rest.applicationId, commandId))
    },

    async deleteGuild(guildId) {
      await rest.delete(rest.routes.guilds.guild(guildId))
    },

    async deleteGuildApplicationCommand(commandId, guildId) {
      await rest.delete(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId))
    },

    async deleteGuildSticker(guildId, stickerId, reason) {
      await rest.delete(rest.routes.guilds.sticker(guildId, stickerId), { reason })
    },

    async deleteGuildTemplate(guildId, templateCode) {
      await rest.delete(rest.routes.guilds.templates.guild(guildId, templateCode))
    },

    async deleteIntegration(guildId, integrationId, reason) {
      await rest.delete(rest.routes.guilds.integration(guildId, integrationId), { reason })
    },

    async deleteInvite(inviteCode, reason) {
      await rest.delete(rest.routes.guilds.invite(inviteCode), { reason })
    },

    async deleteMessage(channelId, messageId, reason) {
      await rest.delete(rest.routes.channels.message(channelId, messageId), { reason })
    },

    async deleteMessages(channelId, messageIds, reason) {
      await rest.post(rest.routes.channels.bulk(channelId), {
        body: {
          messages: messageIds.slice(0, 100).map((id) => id.toString()),
        },
        reason,
      })
    },

    async deleteOriginalInteractionResponse(token) {
      await rest.delete(rest.routes.interactions.responses.original(rest.applicationId, token), { unauthorized: true })
    },

    async deleteOwnReaction(channelId, messageId, reaction) {
      reaction = processReactionString(reaction)

      await rest.delete(rest.routes.channels.reactions.bot(channelId, messageId, reaction))
    },

    async deleteReactionsAll(channelId, messageId) {
      await rest.delete(rest.routes.channels.reactions.all(channelId, messageId))
    },

    async deleteReactionsEmoji(channelId, messageId, reaction) {
      reaction = processReactionString(reaction)

      await rest.delete(rest.routes.channels.reactions.emoji(channelId, messageId, reaction))
    },

    async deleteRole(guildId, roleId, reason) {
      await rest.delete(rest.routes.guilds.roles.one(guildId, roleId), { reason })
    },

    async deleteScheduledEvent(guildId, eventId) {
      await rest.delete(rest.routes.guilds.events.event(guildId, eventId))
    },

    async deleteStageInstance(channelId, reason) {
      await rest.delete(rest.routes.channels.stage(channelId), { reason })
    },

    async deleteUserReaction(channelId, messageId, userId, reaction) {
      reaction = processReactionString(reaction)

      await rest.delete(rest.routes.channels.reactions.user(channelId, messageId, reaction, userId))
    },

    async deleteWebhook(webhookId, reason) {
      await rest.delete(rest.routes.webhooks.id(webhookId), { reason })
    },

    async deleteWebhookMessage(webhookId, token, messageId, options) {
      await rest.delete(rest.routes.webhooks.message(webhookId, token, messageId, options))
    },

    async deleteWebhookWithToken(webhookId, token) {
      await rest.delete(rest.routes.webhooks.webhook(webhookId, token))
    },

    async editApplicationCommandPermissions(guildId, commandId, bearerToken, permissions) {
      return await rest.put<DiscordGuildApplicationCommandPermissions>(
        rest.routes.interactions.commands.permission(rest.applicationId, guildId, commandId),
        {
          body: {
            permissions,
          },
          headers: { authorization: `Bearer ${bearerToken}` },
        },
      )
    },

    async editAutomodRule(guildId, ruleId, body, reason) {
      return await rest.patch<DiscordAutoModerationRule>(rest.routes.guilds.automod.rule(guildId, ruleId), { body, reason })
    },

    async editBotProfile(options) {
      const avatar = options?.botAvatarURL ? await urlToBase64(options?.botAvatarURL) : options?.botAvatarURL

      return await rest.patch<DiscordUser>(rest.routes.userBot(), {
        body: {
          username: options.username?.trim(),
          avatar,
        },
      })
    },

    async editChannel(channelId, body, reason) {
      return await rest.patch<DiscordChannel>(rest.routes.channels.channel(channelId), { body, reason })
    },

    async editChannelPermissionOverrides(channelId, body, reason) {
      await rest.put(rest.routes.channels.overwrite(channelId, body.id), { body, reason })
    },

    async editChannelPositions(guildId, body) {
      await rest.patch(rest.routes.guilds.channels(guildId), { body })
    },

    async editEmoji(guildId, id, body, reason) {
      return await rest.patch<DiscordEmoji>(rest.routes.guilds.emoji(guildId, id), { body, reason })
    },

    async editFollowupMessage(token, messageId, body) {
      return await rest.patch<DiscordMessage>(rest.routes.interactions.responses.message(rest.applicationId, token, messageId), {
        body,
        files: body.files,
        unauthorized: true,
      })
    },

    async editGlobalApplicationCommand(commandId, body) {
      return await rest.patch<DiscordApplicationCommand>(rest.routes.interactions.commands.command(rest.applicationId, commandId), { body })
    },

    async editGuild(guildId, body, reason) {
      return await rest.patch<DiscordGuild>(rest.routes.guilds.guild(guildId), { body, reason })
    },

    async editGuildApplicationCommand(commandId, guildId, body) {
      return await rest.patch<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId), {
        body,
      })
    },

    async editGuildMfaLevel(guildId: BigString, mfaLevel: MfaLevels, reason?: string): Promise<void> {
      await rest.post(rest.routes.guilds.mfa(guildId), { body: { level: mfaLevel }, reason })
    },

    async editGuildSticker(guildId, stickerId, body, reason) {
      return await rest.patch<DiscordSticker>(rest.routes.guilds.sticker(guildId, stickerId), { body, reason })
    },

    async editGuildTemplate(guildId, templateCode: string, body: ModifyGuildTemplate): Promise<Camelize<DiscordTemplate>> {
      return await rest.patch<DiscordTemplate>(rest.routes.guilds.templates.guild(guildId, templateCode), { body })
    },

    async editMessage(channelId, messageId, body) {
      return await rest.patch<DiscordMessage>(rest.routes.channels.message(channelId, messageId), { body, files: body.files })
    },

    async editOriginalInteractionResponse(token, body) {
      return await rest.patch<DiscordMessage>(rest.routes.interactions.responses.original(rest.applicationId, token), {
        body,
        files: body.files,
      })
    },

    async editOriginalWebhookMessage(webhookId, token, options) {
      return await rest.patch<DiscordMessage>(rest.routes.webhooks.original(webhookId, token, options), {
        body: {
          type: InteractionResponseTypes.UpdateMessage,
          data: options,
        },
        files: options.files,
        unauthorized: true,
      })
    },

    async editOwnVoiceState(guildId, options) {
      await rest.patch(rest.routes.guilds.voice(guildId), {
        body: {
          ...options,
          request_to_speak_timestamp: options.requestToSpeakTimestamp
            ? new Date(options.requestToSpeakTimestamp).toISOString()
            : options.requestToSpeakTimestamp,
        },
      })
    },

    async editScheduledEvent(guildId, eventId, body, reason) {
      return await rest.patch<DiscordScheduledEvent>(rest.routes.guilds.events.event(guildId, eventId), { body, reason })
    },

    async editRole(guildId, roleId, body, reason) {
      return await rest.patch<DiscordRole>(rest.routes.guilds.roles.one(guildId, roleId), { body, reason })
    },

    async editRolePositions(guildId, body, reason) {
      return await rest.patch<DiscordRole[]>(rest.routes.guilds.roles.all(guildId), { body, reason })
    },

    async editStageInstance(channelId, topic, reason?: string) {
      return await rest.patch<DiscordStageInstance>(rest.routes.channels.stage(channelId), { body: { topic }, reason })
    },

    async editUserVoiceState(guildId, options) {
      await rest.patch(rest.routes.guilds.voice(guildId, options.userId), { body: options })
    },

    async editWebhook(webhookId, body, reason) {
      return await rest.patch<DiscordWebhook>(rest.routes.webhooks.id(webhookId), { body, reason })
    },

    async editWebhookMessage(webhookId, token, messageId, options) {
      return await rest.patch<DiscordMessage>(rest.routes.webhooks.message(webhookId, token, messageId, options), {
        body: options,
        files: options.files,
      })
    },

    async editWebhookWithToken(webhookId, token, body) {
      return await rest.patch<DiscordWebhook>(rest.routes.webhooks.webhook(webhookId, token), { body })
    },

    async editWelcomeScreen(guildId, body, reason) {
      return await rest.patch<DiscordWelcomeScreen>(rest.routes.guilds.welcome(guildId), { body, reason })
    },

    async editWidgetSettings(guildId, body, reason) {
      return await rest.patch<DiscordGuildWidgetSettings>(rest.routes.guilds.widget(guildId), { body, reason })
    },

    async executeWebhook(webhookId, token, options) {
      return await rest.post<DiscordMessage>(rest.routes.webhooks.webhook(webhookId, token, options), { body: options })
    },

    async followAnnouncement(sourceChannelId, targetChannelId) {
      return await rest.post<DiscordFollowedChannel>(rest.routes.channels.follow(sourceChannelId), {
        body: {
          webhook_channel_id: targetChannelId,
        },
      })
    },

    async getActiveThreads(guildId) {
      return await rest.get<DiscordListActiveThreads>(rest.routes.channels.threads.active(guildId))
    },

    async getApplicationCommandPermission(guildId, commandId) {
      return await rest.get<DiscordGuildApplicationCommandPermissions>(
        rest.routes.interactions.commands.permission(rest.applicationId, guildId, commandId),
      )
    },

    async getApplicationCommandPermissions(guildId) {
      return await rest.get<DiscordGuildApplicationCommandPermissions[]>(rest.routes.interactions.commands.permissions(rest.applicationId, guildId))
    },

    async getApplicationInfo() {
      return await rest.get<DiscordApplication>(rest.routes.oauth2Application())
    },

    async getAuditLog(guildId, options) {
      return await rest.get<DiscordAuditLog>(rest.routes.guilds.auditlogs(guildId, options))
    },

    async getAutomodRule(guildId, ruleId) {
      return await rest.get<DiscordAutoModerationRule>(rest.routes.guilds.automod.rule(guildId, ruleId))
    },

    async getAutomodRules(guildId) {
      return await rest.get<DiscordAutoModerationRule[]>(rest.routes.guilds.automod.rules(guildId))
    },

    async getAvailableVoiceRegions() {
      return await rest.get<DiscordVoiceRegion[]>(rest.routes.regions())
    },

    async getBan(guildId, userId) {
      return await rest.get<DiscordBan>(rest.routes.guilds.members.ban(guildId, userId))
    },

    async getBans(guildId, options) {
      return await rest.get<DiscordBan[]>(rest.routes.guilds.members.bans(guildId, options))
    },

    async getChannel(id) {
      return await rest.get<DiscordChannel>(rest.routes.channels.channel(id))
    },

    async getChannelInvites(channelId) {
      return await rest.get<DiscordInviteMetadata[]>(rest.routes.channels.invites(channelId))
    },

    async getChannels(guildId) {
      return await rest.get<DiscordChannel[]>(rest.routes.guilds.channels(guildId))
    },

    async getChannelWebhooks(channelId) {
      return await rest.get<DiscordWebhook[]>(rest.routes.channels.webhooks(channelId))
    },

    async getDmChannel(userId) {
      return await rest.post<DiscordChannel>(rest.routes.channels.dm(), {
        body: { recipient_id: userId },
      })
    },

    async getEmoji(guildId, emojiId) {
      return await rest.get<DiscordEmoji>(rest.routes.guilds.emoji(guildId, emojiId))
    },

    async getEmojis(guildId) {
      return await rest.get<DiscordEmoji[]>(rest.routes.guilds.emojis(guildId))
    },

    async getFollowupMessage(token, messageId) {
      return await rest.get<DiscordMessage>(rest.routes.interactions.responses.message(rest.applicationId, token, messageId), { unauthorized: true })
    },

    async getGatewayBot() {
      return await rest.get<DiscordGetGatewayBot>(rest.routes.gatewayBot())
    },

    async getGlobalApplicationCommand(commandId) {
      return await rest.get<DiscordApplicationCommand>(rest.routes.interactions.commands.command(rest.applicationId, commandId))
    },

    async getGlobalApplicationCommands() {
      return await rest.get<DiscordApplicationCommand[]>(rest.routes.interactions.commands.commands(rest.applicationId))
    },

    async getGuild(guildId, options = { counts: true }) {
      return await rest.get<DiscordGuild>(rest.routes.guilds.guild(guildId, options.counts))
    },

    async getGuildApplicationCommand(commandId, guildId) {
      return await rest.get<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId))
    },

    async getGuildApplicationCommands(guildId) {
      return await rest.get<DiscordApplicationCommand[]>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId))
    },

    async getGuildPreview(guildId) {
      return await rest.get<DiscordGuildPreview>(rest.routes.guilds.preview(guildId))
    },

    async getGuildTemplate(templateCode) {
      return await rest.get<DiscordTemplate>(rest.routes.guilds.templates.code(templateCode))
    },

    async getGuildTemplates(guildId) {
      return await rest.get<DiscordTemplate[]>(rest.routes.guilds.templates.all(guildId))
    },

    async getGuildWebhooks(guildId) {
      return await rest.get<DiscordWebhook[]>(rest.routes.guilds.webhooks(guildId))
    },

    async getIntegrations(guildId) {
      return await rest.get<DiscordIntegration[]>(rest.routes.guilds.integrations(guildId))
    },

    async getInvite(inviteCode, options) {
      return await rest.get<DiscordInviteMetadata>(rest.routes.guilds.invite(inviteCode, options))
    },

    async getInvites(guildId) {
      return await rest.get<DiscordInviteMetadata[]>(rest.routes.guilds.invites(guildId))
    },

    async getMessage(channelId, messageId) {
      return await rest.get<DiscordMessage>(rest.routes.channels.message(channelId, messageId))
    },

    async getMessages(channelId, options) {
      return await rest.get<DiscordMessage[]>(rest.routes.channels.messages(channelId, options))
    },

    async getNitroStickerPacks() {
      return await rest.get<DiscordStickerPack[]>(rest.routes.nitroStickerPacks())
    },

    async getOriginalInteractionResponse(token) {
      return await rest.get<DiscordMessage>(rest.routes.interactions.responses.original(rest.applicationId, token), { unauthorized: true })
    },

    async getPinnedMessages(channelId) {
      return await rest.get<DiscordMessage[]>(rest.routes.channels.pins(channelId))
    },

    async getPrivateArchivedThreads(channelId, options) {
      return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.private(channelId, options))
    },

    async getPrivateJoinedArchivedThreads(channelId, options) {
      return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.joined(channelId, options))
    },

    async getPruneCount(guildId, options) {
      return await rest.get<DiscordPrunedCount>(rest.routes.guilds.prune(guildId, options))
    },

    async getPublicArchivedThreads(channelId, options) {
      return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.public(channelId, options))
    },

    async getRoles(guildId) {
      return await rest.get<DiscordRole[]>(rest.routes.guilds.roles.all(guildId))
    },

    async getScheduledEvent(guildId, eventId, options) {
      return await rest.get<DiscordScheduledEvent>(rest.routes.guilds.events.event(guildId, eventId, options?.withUserCount))
    },

    async getScheduledEvents(guildId, options) {
      return await rest.get<DiscordScheduledEvent[]>(rest.routes.guilds.events.events(guildId, options?.withUserCount))
    },

    async getScheduledEventUsers(guildId, eventId, options) {
      return await rest.get<Array<{ user: DiscordUser; member?: DiscordMember }>>(rest.routes.guilds.events.users(guildId, eventId, options))
    },

    async getSessionInfo() {
      return await rest.getGatewayBot()
    },

    async getStageInstance(channelId) {
      return await rest.get<DiscordStageInstance>(rest.routes.channels.stage(channelId))
    },

    async getSticker(stickerId: BigString) {
      return await rest.get<DiscordSticker>(rest.routes.sticker(stickerId))
    },

    async getGuildSticker(guildId, stickerId) {
      return await rest.get<DiscordSticker>(rest.routes.guilds.sticker(guildId, stickerId))
    },

    async getGuildStickers(guildId) {
      return await rest.get<DiscordSticker[]>(rest.routes.guilds.stickers(guildId))
    },

    async getThreadMember(channelId, userId) {
      return await rest.get<DiscordThreadMember>(rest.routes.channels.threads.user(channelId, userId))
    },

    async getThreadMembers(channelId) {
      return await rest.get<DiscordThreadMember[]>(rest.routes.channels.threads.members(channelId))
    },

    async getReactions(channelId, messageId, reaction, options) {
      return await rest.get<DiscordUser[]>(rest.routes.channels.reactions.message(channelId, messageId, reaction, options))
    },

    async getUser(id) {
      return await rest.get<DiscordUser>(rest.routes.user(id))
    },

    async getVanityUrl(guildId) {
      return await rest.get<DiscordVanityUrl>(rest.routes.guilds.vanity(guildId))
    },

    async getVoiceRegions(guildId) {
      return await rest.get<DiscordVoiceRegion[]>(rest.routes.guilds.regions(guildId))
    },

    async getWebhook(webhookId) {
      return await rest.get<DiscordWebhook>(rest.routes.webhooks.id(webhookId))
    },

    async getWebhookMessage(webhookId, token, messageId, options) {
      return await rest.get<DiscordMessage>(rest.routes.webhooks.message(webhookId, token, messageId, options))
    },

    async getWebhookWithToken(webhookId, token) {
      return await rest.get<DiscordWebhook>(rest.routes.webhooks.webhook(webhookId, token))
    },

    async getWelcomeScreen(guildId) {
      return await rest.get<DiscordWelcomeScreen>(rest.routes.guilds.welcome(guildId))
    },

    async getWidget(guildId) {
      return await rest.get<DiscordGuildWidget>(rest.routes.guilds.widgetJson(guildId))
    },

    async getWidgetSettings(guildId) {
      return await rest.get<DiscordGuildWidgetSettings>(rest.routes.guilds.widget(guildId))
    },

    async joinThread(channelId) {
      await rest.put(rest.routes.channels.threads.me(channelId))
    },

    async leaveGuild(guildId) {
      await rest.delete(rest.routes.guilds.leave(guildId))
    },

    async leaveThread(channelId) {
      await rest.delete(rest.routes.channels.threads.me(channelId))
    },

    async publishMessage(channelId, messageId) {
      return await rest.post<DiscordMessage>(rest.routes.channels.crosspost(channelId, messageId))
    },

    async removeRole(guildId, userId, roleId, reason) {
      await rest.delete(rest.routes.guilds.roles.member(guildId, userId, roleId), { reason })
    },

    async removeThreadMember(channelId, userId) {
      await rest.delete(rest.routes.channels.threads.user(channelId, userId))
    },

    async sendFollowupMessage(token, options) {
      return await rest.post(rest.routes.webhooks.webhook(rest.applicationId, token), {
        body: options,
        files: options.files,
        unauthorized: true,
      })
    },

    async sendInteractionResponse(interactionId, token, options) {
      return await rest.post(rest.routes.interactions.responses.callback(interactionId, token), {
        body: options,
        files: options.data?.files,
        runThroughQueue: false,
        unauthorized: true,
      })
    },

    async sendMessage(channelId, body) {
      return await rest.post<DiscordMessage>(rest.routes.channels.messages(channelId), { body, files: body.files })
    },

    async startThreadWithMessage(channelId, messageId, body, reason) {
      return await rest.post<DiscordChannel>(rest.routes.channels.threads.message(channelId, messageId), { body, reason })
    },

    async startThreadWithoutMessage(channelId, body, reason) {
      return await rest.post<DiscordChannel>(rest.routes.channels.threads.all(channelId), { body, reason })
    },

    async syncGuildTemplate(guildId) {
      return await rest.put<DiscordTemplate>(rest.routes.guilds.templates.all(guildId))
    },

    async banMember(guildId, userId, body, reason) {
      await rest.put<void>(rest.routes.guilds.members.ban(guildId, userId), { body, reason })
    },

    async editBotMember(guildId, body, reason) {
      return await rest.patch<DiscordMember>(rest.routes.guilds.members.bot(guildId), { body, reason })
    },

    async editMember(guildId, userId, body, reason) {
      return await rest.patch<DiscordMemberWithUser>(rest.routes.guilds.members.member(guildId, userId), { body, reason })
    },

    async getMember(guildId, userId) {
      return await rest.get<DiscordMemberWithUser>(rest.routes.guilds.members.member(guildId, userId))
    },

    async getMembers(guildId, options) {
      return await rest.get<DiscordMemberWithUser[]>(rest.routes.guilds.members.members(guildId, options))
    },

    async kickMember(guildId, userId, reason) {
      await rest.delete(rest.routes.guilds.members.member(guildId, userId), {
        reason,
      })
    },

    async pinMessage(channelId, messageId, reason) {
      await rest.put(rest.routes.channels.pin(channelId, messageId), { reason })
    },

    async pruneMembers(guildId, body, reason) {
      return await rest.post<{ pruned: number | null }>(rest.routes.guilds.members.prune(guildId), { body, reason })
    },

    async searchMembers(guildId, query, options) {
      return await rest.get<DiscordMemberWithUser[]>(rest.routes.guilds.members.search(guildId, query, options))
    },

    async unbanMember(guildId, userId, reason) {
      await rest.delete(rest.routes.guilds.members.ban(guildId, userId), { reason })
    },

    async unpinMessage(channelId, messageId, reason) {
      await rest.delete(rest.routes.channels.pin(channelId, messageId), { reason })
    },

    async triggerTypingIndicator(channelId) {
      await rest.post(rest.routes.channels.typing(channelId))
    },

    async upsertGlobalApplicationCommands(body) {
      return await rest.put<DiscordApplicationCommand[]>(rest.routes.interactions.commands.commands(rest.applicationId), { body })
    },

    async upsertGuildApplicationCommands(guildId, body) {
      return await rest.put<DiscordApplicationCommand[]>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId), { body })
    },

    preferSnakeCase(enabled: boolean) {
      const camelizer = enabled ? (x: any) => x : camelize

      rest.get = async (url, options) => {
        return camelizer(await rest.makeRequest('GET', url, options))
      }

      rest.post = async (url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) => {
        return camelizer(await rest.makeRequest('POST', url, options))
      }

      rest.delete = async (url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) => {
        camelizer(await rest.makeRequest('DELETE', url, options))
      }

      rest.patch = async (url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) => {
        return camelizer(await rest.makeRequest('PATCH', url, options))
      }

      rest.put = async (url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) => {
        return camelizer(await rest.makeRequest('PUT', url, options))
      }

      return rest
    },
  }

  return rest
}

enum HttpResponseCode {
  /** Minimum value of a code in oder to consider that it was successful. */
  Success = 200,
  /** Request completed successfully, but Discord returned an empty body. */
  NoContent = 204,
  /** Minimum value of a code in order to consider that something went wrong. */
  Error = 400,
  /** This request got rate limited. */
  TooManyRequests = 429,
}
