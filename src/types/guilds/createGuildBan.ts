/** https://discord.com/developers/docs/resources/guild#create-guild-ban */
export interface CreateGuildBan {
  /** Number of days to delete messages for (0-7) */
  deleteMessageDays?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Reason for the ban */
  reason?: string;
}
