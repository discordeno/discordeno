import { GuildTemplate } from "../types/guild.ts";

export function createTemplate(
  data: GuildTemplate,
) {
  const {
    usage_count: usageCount,
    creator_id: creatorID,
    created_at: createdAt,
    updated_at: updatedAt,
    source_guild_id: sourceGuildID,
    serialized_source_guild: serializedSourceGuild,
    is_dirty: isDirty,
    ...rest
  } = data;

  const template = {
    ...rest,
    usageCount,
    creatorID,
    createdAt,
    updatedAt,
    sourceGuildID,
    serializedSourceGuild,
    isDirty,
  };

  return template;
}

export interface Template extends ReturnType<typeof createTemplate> {}
