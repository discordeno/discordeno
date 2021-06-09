// TODO: add dock link
export interface SelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string;
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string;
  /** An additional description of the option. Maximum 50 characters. */
  description?: string;
  /** The id, name, and animated properties of an emoji. */
  emoji?:
    | string
    | {
        /** Emoji id */
        id?: string;
        /** Emoji name */
        name?: string;
        /** Whether this emoji is animated */
        animated?: boolean;
      };
  /** Will render this option as already-selected by default. */
  default: boolean;
}
