import { endpoints } from "../../util/constants.ts";
import { formatImageURL } from "../../util/utils.ts";

/** The users custom avatar or the default avatar if you don't have a member object. */
export function avatarURL(
  userId: string,
  discriminator: string,
  avatar?: string | null,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return avatar
    ? formatImageURL(endpoints.USER_AVATAR(userId, avatar), size, format)
    : endpoints.USER_DEFAULT_AVATAR(Number(discriminator) % 5);
}
