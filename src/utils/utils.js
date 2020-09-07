import CryptoJS from 'crypto-js/crypto-js'

const KEY = 'WEOIEuOz0Kra1qQwlNI0Cx54'

export const httpCode = {
  'OK': 200,
  'Created': 201,
  'BadRequest': 400,
  'Unauthorized': 401,
  'Forbidden': 403,
  'Not Found': 404,
  'Not Acceptable': 406,
  'Conflict': 409
}

// eslint-disable-next-line
export function enDES3 (str) {
  const encrypt = CryptoJS.TripleDES.encrypt(str, CryptoJS.enc.Utf8.parse(KEY), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypt.toString()
}
