export function calculateKey(key: string, city?: string) {
  if (city) {
    return `${key}-${city.length > 2 ? "zs" : city}`;
  }
  return key
}
