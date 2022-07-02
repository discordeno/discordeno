import { Bot } from "../../bot.ts";
import { DiscordApplication } from "../../types/discord.ts";
import { Application } from "../application.ts";

export function transformApplicationToDiscordApplication(bot: Bot, payload: Application): DiscordApplication {
  return {
    name: payload.name,
    description: payload.description,
    rpc_origins: payload.rpcOrigins,
    bot_public: payload.botPublic,
    bot_require_code_grant: payload.botRequireCodeGrant,
    terms_of_service_url: payload.termsOfServiceUrl,
    privacy_policy_url: payload.privacyPolicyUrl,
    verify_key: payload.verifyKey,
    primary_sku_id: payload.primarySkuId,
    slug: payload.slug,
    cover_image: payload.coverImage ? bot.utils.iconBigintToHash(payload.coverImage) : undefined,
    flags: payload.flags,

    id: bot.utils.bigintToSnowflake(payload.id),
    icon: payload.icon ? bot.utils.iconBigintToHash(payload.icon) : null,
    owner: payload.owner ? bot.transformers.reverse.user(bot, payload.owner) : undefined,
    team: payload.team ? bot.transformers.reverse.team(bot, payload.team) : null,
    guild_id: payload.guildId ? bot.utils.bigintToSnowflake(payload.guildId) : undefined,
  };
}
