const token = process.env.TOKEN
const owners = process.env.OWNERS

if (!token) throw new Error('Missing TOKEN environment variable')
if (!owners) throw new Error('Missing OWNERS environment variable')

export const configs: Config = {
  token,
  owners: owners.split(',').map(BigInt),
}

export interface Config {
  token: string
  owners: bigint[]
}
