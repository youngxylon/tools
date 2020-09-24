function trimExtraChar(value: string, char: string, regExp: RegExp) {
  const index = value.indexOf(char)

  if (index === -1) {
    return value
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index)
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
}

export function formatNumber(value: string, args: object = {}): string {
  value = value.replace(/^\./g, '') //必须保证第一个为数字而不是

  if (args['noDot']) {
    value = value.split('.')[0]
  } else {
    value = trimExtraChar(value, '.', /\./g)
  }

  if (args['noMinus']) {
    value = value.replace(/-/, '')
  } else {
    value = trimExtraChar(value, '-', /-/g)
  }

  const regExp = args['noDot'] ? /[^-0-9]/g : /[^-0-9.]/g

  return value.replace(regExp, '')
}
