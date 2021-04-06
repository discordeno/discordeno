import { CreateMessage } from "../messages/create_message.ts";
import { FileContent } from "../misc/file_content.ts";

export interface DiscordenoCreateMessage extends CreateMessage {
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
}
