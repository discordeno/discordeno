/** Types for: https://docs.discord.com/developers/reference */

/**
 * This is not a mapping of any discord documented type, however there is some docs that refer to an object like this:
 * https://docs.discord.com/developers/reference#uploading-files, the second paragraph
 *
 * > All files[n] parameters must include a valid `Content-Disposition` subpart header with a filename and unique name parameter.
 *
 * The blob maps to the FormData data sent and the name maps to the FormData file name.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData/set}
 */
export interface FileContent {
  /** The file blob */
  blob: Blob;
  /** The name of the file */
  name: string;
}
