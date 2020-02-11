export interface EmojiPayload {
	name: string;
	id?: string;
	animated?: boolean;
}

export const createEmoji = (data: unknown) => {
  console.log(data)
}
