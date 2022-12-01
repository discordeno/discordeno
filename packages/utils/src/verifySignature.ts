import { verify } from 'node:crypto'

export function verifySignature ({ publicKey, signature, timestamp, body }: VerifySignatureOptions): {
  isValid: boolean
  body: string
} {
  const isValid = verify(
    'ed25519',
    Buffer.from(timestamp + body),
    publicKey,
    Buffer.from(signature)
  )

  return { isValid, body }
}

export interface VerifySignatureOptions {
  publicKey: string
  signature: string
  timestamp: string
  body: string
}
