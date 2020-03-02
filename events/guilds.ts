import { Guild } from "../types/return-type.ts"
import { cache } from "../utils/cache.ts"

export const handle_internal_guild_create = (guild: Guild) => {
	cache.guilds.set(guild.id(), guild)
}

export const handle_internal_guild_update = (guild: Guild) => {
	cache.guilds.set(guild.id(), guild)
}

export const handle_internal_guild_delete = (guild: Guild) => {
	cache.guilds.delete(guild.id())
}
