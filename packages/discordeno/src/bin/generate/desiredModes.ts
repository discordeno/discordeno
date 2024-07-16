export enum DesiredProprietiesBehavior {
  Remove,
  TypeAsNever,
}

// TODO: source these values from the config file

export const desiredProprietiesBehavior: DesiredProprietiesBehavior = DesiredProprietiesBehavior.TypeAsNever

export function isProprietyDesired(interfaceName: string, memberName: string) {
  if (interfaceName === 'Message' && memberName === 'id') return true
}
