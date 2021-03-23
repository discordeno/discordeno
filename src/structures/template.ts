import { cache } from "../cache.ts";
import { createNewProp } from "../util/utils.ts";
import { Guild } from "./guild.ts";

const baseTemplate: Partial<Template> = {
  get sourceGuild() {
    // deno-lint-ignore getter-return
    if (!this.sourceGuildID) return;
    return cache.guilds.get(this.sourceGuildID);
  },
};

export function createTemplateStruct(
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

  const restProps: Record<string, Partial<PropertyDescriptor>> = {};
  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    restProps[key] = createNewProp(rest[key]);
  }

  return Object.create(baseTemplate, {
    ...restProps,
    usageCount: createNewProp(sourceGuildID),
    creatorID: createNewProp(creatorID),
    createdAt: createNewProp(createdAt),
    updatedAt: createNewProp(updatedAt),
    sourceGuildID: createNewProp(sourceGuildID),
    serializedSourceGuild: createNewProp(serializedSourceGuild),
    isDirty: createNewProp(isDirty),
  }) as Template;
}
