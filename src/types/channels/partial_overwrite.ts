// TODO: add Partial Overwrite structure link
export interface PartialOverwrite {
  /** Role of user id */
  id: string;
  /** Either 0 (role) or 1 (member). Default: 0 */
  type?: number | null;
  /** Permission bit set. Default: "0" */
  allow?: string | null;
  /** Permission bit set. Default: "0" */
  deny?: string | null;
}
