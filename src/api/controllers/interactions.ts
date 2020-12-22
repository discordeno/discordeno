import { eventHandlers } from "../../bot.ts";
import {
  DiscordPayload,
  InteractionCommandPayload,
} from "../../types/types.ts";
import { createMember } from "../structures/member.ts";

export async function handleInternalInteractionsCreate(data: DiscordPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  const payload = data.d as InteractionCommandPayload;

  eventHandlers.interactionCreate?.(
    {
      ...payload,
      member: await createMember(payload.member, payload.guild_id),
    },
  );
}

export async function handleInternalInteractionsCommandCreate(
  data: DiscordPayload,
) {
  if (data.t !== "APPLICATION_COMMAND_CREATE") return;

  console.log(data);
  eventHandlers.interactionCreate?.(data);
}
