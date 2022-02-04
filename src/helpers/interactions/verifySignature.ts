import { verify } from "https://unpkg.com/@evan/wasm@0.0.93/target/ed25519/deno.js";

export function verifySignature({ publicKey, signature, timestamp, body }: VerifySignatureOptions): {
  isValid: boolean;
  body: string;
} {
  const isValid = verify(
    hexToUint8Array(publicKey),
    hexToUint8Array(signature),
    new TextEncoder().encode(timestamp + body),
  );

  return { isValid, body };
}

/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}

export interface VerifySignatureOptions {
  publicKey: string;
  signature: string;
  timestamp: string;
  body: string;
}
