import { Attachment, Bot } from "../deps.ts";

export function validateAttachments(bot: Bot, attachments: Attachment[]) {
  attachments.forEach((attachment) => {
    if (attachment.description && !bot.utils.validateLength(attachment.description, { min: 0, max: 1024 })) {
      throw new Error("Attachment description length must be less than 1024 characters");
    }
  });
}
