import { messageToggles } from "../../../structures/message.ts";
import { BitField } from "./BitField.ts";

export class MessageBitField extends BitField {
  constructor(bits: bigint) {
    super(bits);
  }

  /** Whether this was a TTS message */
  get tts() {
    return this.has(messageToggles.tts);
  }

  /** Change whether this was a TTS message */
  set tts(value: boolean) {
    this.set(messageToggles.tts, value);
  }

  /** Whether this message mentions everyone */
  get mentionEveryone() {
    return this.has(messageToggles.mentionEveryone);
  }

  /** Changes whether this message mentions everyone */
  set mentionEveryone(value: boolean) {
    this.set(messageToggles.mentionEveryone, value);
  }

  /** Whether this message is pinned */
  get pinned() {
    return this.has(messageToggles.pinned);
  }

  /** Changes whether this message is pinned */
  set pinned(value: boolean) {
    this.set(messageToggles.pinned, value);
  }
}

export default MessageBitField;
