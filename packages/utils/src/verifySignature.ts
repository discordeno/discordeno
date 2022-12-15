import nacl from 'tweetnacl'

export function verifySignature ({
  publicKey,
  signature,
  timestamp,
  body
}: VerifySignatureOptions): {
    isValid: boolean
    body: string
  } {
  const isValid = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(publicKey, 'hex')
  )

  return { isValid, body }
}
export interface VerifySignatureOptions {
  publicKey: string
  signature: string
  timestamp: string
  body: string
}
