import { c1amelize1Message, s1nakelize1Message } from './casing/message.js'
import { c1amelize1User, s1nakelize1User } from './casing/user.js'

export * from './casing/index.js'

export const TRANSFORMERS = {
  message: c1amelize1Message,
  user: c1amelize1User,

  reverse: {
    message: s1nakelize1Message,
    user: s1nakelize1User
  }
}

export default TRANSFORMERS
