module.exports = function() {
  function getRandomNum() {
    const min = 0,
      max = 9
    return Math.floor(Math.random() * (max - min) + min)
  }
  let code = '',
    codeLength = 4
  while (codeLength--) {
    code = code.concat(getRandomNum())
  }
  return code
}
