import { Bot } from "../bot.ts";
import { DiscordApplication } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformApplication(bot: Bot, payload: DiscordApplication) {
  const application = {
    name: payload.name,
    description: payload.description,
    rpcOrigins: payload.rpc_origins,
    botPublic: payload.bot_public,
    botRequireCodeGrant: payload.bot_require_code_grant,
    termsOfServiceUrl: payload.terms_of_service_url,
    privacyPolicyUrl: payload.privacy_policy_url,
    verifyKey: payload.verify_key,
    primarySkuId: payload.primary_sku_id,
    slug: payload.slug,
    coverImage: payload.cover_image ? bot.utils.iconHashToBigInt(payload.cover_image) : undefined,
    flags: payload.flags,

    id: bot.transformers.snowflake(payload.id),
    icon: payload.icon ? bot.utils.iconHashToBigInt(payload.icon) : undefined,
    // @ts-ignore the partial here wont break anything
    owner: payload.owner ? bot.transformers.user(bot, payload.owner) : undefined,
    team: payload.team ? bot.transformers.team(bot, payload.team) : undefined,
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
  };

  return application as Optionalize<typeof application>;
}

export interface Application extends ReturnType<typeof transformApplication> {}
