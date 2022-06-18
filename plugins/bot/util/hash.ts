export function iconHashToBigInt(hash: string) {
  // The icon is animated so it needs special handling
  if (hash.startsWith("a_")) {
    // Change the `a_` to just be `a`
    hash = `a${hash.substring(2)}`;
  } else {
    // The icon is not animated but it could be that it starts with a 0 so we just put a `b` in front so nothing breaks
    hash = `b${hash}`;
  }

  return BigInt(`0x${hash}`);
}

export function iconBigintToHash(icon: bigint) {
  // Convert the bigint back to a hash
  const hash = icon.toString(16);
  // Hashes starting with a are animated and with b are not so need to handle that
  return hash.startsWith("a") ? `a_${hash.substring(1)}` : hash.substring(1);
}
