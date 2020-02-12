import { Role, Role_Data } from "../types/role"

export const create_role = (data: Role_Data) => {
  const role: Role = {
    ...data,
    mention: () => `<@&${data.id}>`
  }

  return role
}
