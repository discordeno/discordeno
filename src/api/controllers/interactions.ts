import { eventHandlers } from "../../bot.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalInteractionCreate(data: DiscordPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  const payload = data.d as InteractionCommandPayload;
  const memberStruct = await structures.createMember(
    payload.member,
    payload.guild_id,
  );
  await cacheHandlers.set("members", memberStruct.id, memberStruct);

  eventHandlers.interactionCreate?.(
    {
      ...payload,
      member: memberStruct,
    },
  );
}

export function handleInternalApplicationCommandCreate(
  data: DiscordPayload,
) {
  if (data.t !== "APPLICATION_COMMAND_CREATE") return;

  const {
    guild_id: guildID,
    application_id: applicationID,
    ...rest
  } = data.d as ApplicationCommandEvent;

  eventHandlers.applicationCommandCreate?.({
    ...rest,
    guildID,
    applicationID,
  });
}

export function handleInternalApplicationCommandUpdate(data: DiscordPayload) {
  if (data.t !== "APPLICATION_COMMAND_UPDATE") return;

  const {
    application_id: applicationID,
    guild_id: guildID,
    ...rest
  } = data.d as ApplicationCommandEvent;

  eventHandlers.applicationCommandUpdate?.({
    ...rest,
    guildID,
    applicationID,
  });
}

export function handleInternalApplicationCommandDelete(data: DiscordPayload) {
  if (data.t !== "APPLICATION_COMMAND_DELETE") return;

  const {
    application_id: applicationID,
    guild_id: guildID,
    ...rest
  } = data.d as ApplicationCommandEvent;

  eventHandlers.applicationCommandDelete?.({
    ...rest,
    guildID,
    applicationID,
  });
}
