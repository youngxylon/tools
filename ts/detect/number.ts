export function isNumber(num: string): boolean {
  const regPos = /^\d+(\.\d+)?$/ //非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ //负浮点数
  if (regPos.test(num) || regNeg.test(num)) {
    return true
  } else {
    return false
  }
}
