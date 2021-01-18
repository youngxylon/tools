const verificationCode = require('../js/verification-code')

test('get verification code',()=>{
  expect(verificationCode()).toMatch(/^\d{4}$/)
})