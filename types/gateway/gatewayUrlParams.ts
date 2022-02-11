/** https://discord.com/developers/docs/topics/gateway#connecting-gateway-url-params */
export interface GatewayURLParams {
  /** Gateway version to use */
  v: string;
  /** The encoding of received gateway packets */
  encoding: string;
  /** The (optional) compression of gateway packets */
  compress?: string;
}
