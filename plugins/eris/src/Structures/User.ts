import { DiscordUser, UserFlags } from "../../deps.ts";
import { Base } from "../Base.ts";
import Client, { BigString, ImageFormat, ImageSize } from "../Client.ts";
import { BANNER, DEFAULT_USER_AVATAR, USER_AVATAR } from "../Endpoints.ts";

export class User extends Base {
  client: Client;
  bot: boolean;
  system: boolean;
  _avatar!: bigint | null;
  username!: string;
  discriminator!: string;
  publicFlags?: UserFlags;
  _banner!: bigint | null;
  accentColor?: number;

  constructor(data: DiscordUser, client: Client) {
    super(data.id);

    this.client = client;
    this.bot = !!data.bot;
    this.system = !!data.system;

    this.update(data);
  }

  /** @deprecated Use User.client Supported for Eris api compatibility. */
  get _client() {
    return this.client;
  }

  get avatar(): string | null {
    if (!this._avatar) return null;

    return this.client.iconBigintToHash(this._avatar);
  }

  set avatar(value: BigString | null) {
    this._avatar = typeof value === "string" ? this.client.iconHashToBigInt(value) : value;
  }

  get banner(): string | null {
    if (!this._banner) return null;

    return this.client.iconBigintToHash(this._banner);
  }

  set banner(value: BigString | null) {
    this._banner = typeof value === "string" ? this.client.iconHashToBigInt(value) : value;
  }

  get avatarURL() {
    return this.avatar ? this.client._formatImage(USER_AVATAR(this.id, this.avatar)) : this.defaultAvatarURL;
  }

  get bannerURL() {
    if (!this.banner) {
      return null;
    }

    return this.client._formatImage(BANNER(this.id, this.banner));
  }

  get defaultAvatar() {
    // @ts-ignore some eris magic at play here
    return (this.discriminator % 5).toString();
  }

  get defaultAvatarURL() {
    return `${this.client.CDN_URL}${DEFAULT_USER_AVATAR(this.defaultAvatar)}.png`;
  }

  get mention() {
    return `<@${this.id}>`;
  }

  get staticAvatarURL() {
    return this.avatar ? this.client._formatImage(USER_AVATAR(this.id, this.avatar), "jpg") : this.defaultAvatarURL;
  }

  update(data: DiscordUser) {
    if (data.avatar !== undefined) {
      this.avatar = data.avatar;
    }
    if (data.username !== undefined) {
      this.username = data.username;
    }
    if (data.discriminator !== undefined) {
      this.discriminator = data.discriminator;
    }
    if (data.public_flags !== undefined) {
      this.publicFlags = data.public_flags;
    }
    if (data.banner !== undefined) {
      this.banner = data.banner;
    }
    if (data.accent_color !== undefined) {
      this.accentColor = data.accent_color;
    }
  }

  /** Get the user's avatar with the given format and size */
  dynamicAvatarURL(format?: ImageFormat, size?: ImageSize) {
    return this.avatar
      ? this.client._formatImage(USER_AVATAR(this.id, this.avatar), format, size)
      : this.defaultAvatarURL;
  }

  /** Get the user's banner with the given format and size */
  dynamicBannerURL(format?: ImageFormat, size?: ImageSize) {
    return this.banner ? this.client._formatImage(BANNER(this.id, this.banner), format, size) : null;
  }

  /**
   * Get a DM channel with the user, or create one if it does not exist
   * @returns {Promise<PrivateChannel>}
   */
  getDMChannel() {
    return this.client.getDMChannel.call(this.client, this.id);
  }

  toJSON(props: string[] = []) {
    return super.toJSON([
      "accentColor",
      "avatar",
      "banner",
      "bot",
      "discriminator",
      "publicFlags",
      "system",
      "username",
      ...props,
    ]);
  }
}

export default User;
