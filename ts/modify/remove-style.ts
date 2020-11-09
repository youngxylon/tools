export function removeStyle(str: string): string {
  return str.replace(/<\/?.+?>/g, '').replace(/ /g, '')
}
