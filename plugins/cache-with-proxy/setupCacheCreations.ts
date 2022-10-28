import {
    Bot,
    DiscordUnavailableGuild,
  } from "discordeno";
  import { BotWithProxyCache, ProxyCacheTypes } from "./index.js";
  import { unavailablesGuilds } from './setupCacheEdits.js'
  
  export function setupCacheCreations<B extends Bot>(
    bot: BotWithProxyCache<ProxyCacheTypes, B>
  ) {
    const { GUILD_CREATE } = bot.handlers;
  
    bot.handlers.GUILD_CREATE = function (_, data, shardId) {
      // handle it as unavailable cuz we dont know what we're really getting
      const payload = data.d as DiscordUnavailableGuild;
      const id = bot.transformers.snowflake(payload.id);
  
      // add guild to unavailable Set if its unavailable
      if (payload.unavailable) unavailablesGuilds.add(id);
  
      GUILD_CREATE(bot, data, shardId);
    };
  }
  