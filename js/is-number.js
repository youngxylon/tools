export default function isNumber(num) {
  var regPos = / ^\d+$/ // 非负整数
  var regNeg = /^\-[1-9][0-9]*$/ // 负整数
  if (regPos.test(num) || regNeg.test(num)) {
    return true
  } else {
    return false
  }
},