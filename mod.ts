import Client from './module/Client.ts'
import { configs } from './configs.ts'

const Discordeno = new Client(configs.token)
Discordeno.connect()

export default Discordeno
