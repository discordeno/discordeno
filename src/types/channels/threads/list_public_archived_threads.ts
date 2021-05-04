// TODO: add docs link
export interface ListPublicArchivedThreads {
  // TODO: convert unix to ISO9601 timestamp
  /** Returns threads before this timestamp. UNIX or ISO8601 timestamp */
  before?: number | string;
  /** Optional maximum number of threads to return */
  limit?: number;
}
