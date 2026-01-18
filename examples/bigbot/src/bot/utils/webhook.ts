/** Get the webhook id and token from a webhook url. */
export function webhookURLToIDAndToken(url: string): { id?: string; token?: string } {
  const [id, token] = url.substring(url.indexOf('webhooks/') + 9).split('/');

  return {
    id,
    token,
  };
}
