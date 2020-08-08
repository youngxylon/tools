export function underscoreToUpperObj(obj: object): object {
  for (const i in obj) {
    if (i.includes('_')) {
      obj[underscoreToUpper(i)] = obj[i]
      delete obj[i]
    }
  }
  return obj
}

function underscoreToUpper(str:string):string {
  const s = str.split('_')
  return s[0] + s[1].substring(0, 1).toUpperCase() + s[1].substring(1)
}
