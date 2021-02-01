/**
 * get the value in Object or Array
 * key include "." to separate
 * @param {Object | Array} arg
 * @param {String} key
 * @returns {String | null}
 */
function getValue(arg, key) {
  if (!arg) {
    return null
  }

  if (typeof key === 'string') {
    return getValue(arg, key.split('.'))
  }

  if (key.length === 1) {
    if (Object.prototype.hasOwnProperty.call(arg, key[0])) {
      return arg[key[0]] !== undefined ? arg[key[0]] : null
    } else {
      return null
    }
  }

  if (Object.prototype.hasOwnProperty.call(arg, key[0])) {
    return getValue(arg[key[0]], key.slice(1))
  }
}

module.exports = getValue
