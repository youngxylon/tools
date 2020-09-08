export function getProperty(
  obj: object | any[],
  key: string | string[]
): string | boolean {
  if (!obj) {
    return ''
  }

  if (typeof key === 'string') {
    return getProperty(obj, key.split('.'))
  }

  if (key.length === 1 && obj.hasOwnProperty(key[0])) {
    return obj[key[0]]
  }

  if (obj.hasOwnProperty(key[0])) {
    return getProperty(obj[key[0]], key.slice(1))
  }
}
