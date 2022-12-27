import { c1amelize1User, s1nakelize1User } from './casing/user.js'

export * from './casing/index.js'

export const TRANSFORMERS = {
  user: c1amelize1User,

  reverse: {
    user: s1nakelize1User
  }
}

export default TRANSFORMERS
