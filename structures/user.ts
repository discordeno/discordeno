export interface UserPayload {
    /** The user's id */
    id: string;

    /** The user's username, not unique across the platform */
    username: string;

    /** The user's 4-digit discord-tag */
    discriminator: string;

    /** The user's avatar hash */
    avatar: string;

    /** Whether the user belongs to an OAuth2 application */
    bot?: boolean;

    /** Whether the user is an Official Discord System user (part of the urgent message system) */
    system?: boolean;

    /** Whether the user has two factor enabled on their account */
    mfa_enabled?: boolean;

    // Types with "email" scope intentionally left out.
    /** The flags on a user's account */
    flags?: number;

    /** The type of Nitro subscription on a user's account */
    premium_type?: PremiumType;
}

export const enum PremiumType {
    NitroClassic = 1,
    Nitro
}
