import { DiscordPremiumTypes } from "../../types/users/premium_types.ts";
import { User as UserPayload } from "../../types/users/user.ts";
import { DiscordUserFlags } from "../../types/users/user_flags.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { iconHashToBigInt } from "../../util/hash.ts";
import Base from "./Base.ts";
import UserBitfield from "./Bitfields/User.ts";
import Client from "./Client.ts";

export class User extends Base {
  /** The username for this user. */
  username: string;
  /** The compressed version of this users discriminator. You probably want to use `discriminator`. */
  discrim: number;
  /** The avatar hash for this user */
  avatar: bigint;
  /** The boolean toggles available on this user. */
  bitfield: UserBitfield;
  /** The flags on this user */
  flags?: DiscordUserFlags;
  /** The public flags on this user */
  publicFlags?: DiscordUserFlags;
  /** The premium type for this user */
  premiumType?: DiscordPremiumTypes;

  constructor(client: Client, payload: UserPayload) {
    super(client, snowflakeToBigint(payload.id));

    this.bitfield = new UserBitfield();
    this.username = payload.username;
    this.discrim = Number(payload.discriminator);
    this.flags = payload.flags;
    this.publicFlags = payload.publicFlags;
    this.premiumType = payload.premiumType;
    const hash = payload.avatar ? iconHashToBigInt(payload.avatar) : undefined;

    // Update the avatar
    this.avatar = hash?.bigint || 0n;
    // Update the animated status if its animated
    this.bitfield.animated = !!hash?.animated;
  }

  /** The discriminator for this user. */
  get discriminator() {
    return this.discrim.toString().padStart(4, "0");
  }

  /** The full username#discriminator tag for this user. */
  get tag() {
    return `${this.username}#${this.discriminator}`;
  }
}

export default User;
