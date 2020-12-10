export async function handleInternalInteractionsCreate(data: DiscordPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  console.log(data);
}
