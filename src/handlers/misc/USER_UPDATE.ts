import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { memberToggles } from "../../structures/member.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { User } from "../../types/users/user.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { iconHashToBigInt } from "../../util/hash.ts";

export async function handleUserUpdate(data: DiscordGatewayPayload) {
  const userData = data.d as User;

  const member = await cacheHandlers.get("members", snowflakeToBigint(userData.id));
  if (!member) return;

  // Update username
  member.username = userData.username;
  // Update discriminator
  member.discriminator = BigInt(userData.discriminator);

  // Check if a avatar is available
  const hash = userData.avatar ? iconHashToBigInt(userData.avatar) : undefined;
  if (hash) {
    // Update the avatar
    member.avatar = hash.bigint;
    // Update the animated status if its animated
    if (hash.animated) member.bitfield |= memberToggles.animatedAvatar;
    else member.bitfield &= ~memberToggles.animatedAvatar;
  }

  await cacheHandlers.set("members", snowflakeToBigint(userData.id), member);

  eventHandlers.botUpdate?.(userData);
}
