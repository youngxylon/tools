export default function underscoreToUpperObj(obj: object): object {
  for (const i in obj) {
    if (i.includes('_')) {
      obj[underscoreToUpper(i)] = obj[i]
      delete obj[i]
    }
  }
  return obj
}

function underscoreToUpper(str:string):string {
  const s = str.split('_')[1]
  return s.substring(0, 1).toUpperCase() + s.substring(1)
}
