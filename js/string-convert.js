function toUpperCase(str) {
  if (str[0]) {
    return str.replace(str[0], str[0].toUpperCase())
  } else {
    return ''
  }
}

function toLowerCase(str) {
  if (str[0]) {
    return str.replace(str[0], str[0].toLowerCase())
  } else {
    return ''
  }
}

function toUnderscore(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

function toCamelCase(str) {
  return str.replace(/\_|\-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

module.exports = { toUpperCase, toLowerCase, toUnderscore, toCamelCase }
