export function fuzzyQuery(list:string[], keyWord:string):string[] {
  const regex:RegExp  = new RegExp(keyWord, 'i');
  return list.filter(e => regex.test(e));
}