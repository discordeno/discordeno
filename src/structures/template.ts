import { eventHandlers } from "../bot.ts";
import { cache } from "../cache.ts";
import { createNewProp } from "../util/utils.ts";

const baseTemplate: Partial<Template> = {
  get sourceGuild() {
    // deno-lint-ignore getter-return
    if (!this.sourceGuildId) return;
    return cache.guilds.get(this.sourceGuildId);
  },
};

export function createTemplateStruct(
  data: GuildTemplate,
) {
  const {
    usage_count: usageCount,
    creator_id: creatorId,
    created_at: createdAt,
    updated_at: updatedAt,
    source_guild_id: sourceGuildId,
    serialized_source_guild: serializedSourceGuild,
    is_dirty: isDirty,
    ...rest
  } = data;

  const restProps: Record<string, Partial<PropertyDescriptor>> = {};
  for (const key of Object.keys(rest)) {
    eventHandlers.debug(
      "loop",
      `Running for of loop in createTemplateStruct function.`,
    );
    // @ts-ignore index signature
    restProps[key] = createNewProp(rest[key]);
  }

  return Object.create(baseTemplate, {
    ...restProps,
    usageCount: createNewProp(sourceGuildId),
    creatorId: createNewProp(creatorId),
    createdAt: createNewProp(createdAt),
    updatedAt: createNewProp(updatedAt),
    sourceGuildId: createNewProp(sourceGuildId),
    serializedSourceGuild: createNewProp(serializedSourceGuild),
    isDirty: createNewProp(isDirty),
  }) as Template;
}
