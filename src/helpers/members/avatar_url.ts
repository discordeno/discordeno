import { Member } from "../../structures/mod.ts";
import { rawAvatarURL } from "./raw_avatar_url.ts";

/** The users custom avatar or the default avatar */
export function avatarURL(
  member: Member,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return rawAvatarURL(
    member.id,
    member.discriminator,
    member.avatar,
    size,
    format,
  );
}
