import {signToken, verifyToken} from './jwt'
import config from "../api.config.json";

describe('utils/jwt.ts',()=>{
  let token="", verified:any={}
  const data = {user:"username", email:"email@gmail.com"}

  beforeAll(()=>{
    token = signToken(data)
    verified = verifyToken(token)
  })

  test('should create JWT with 3 sections split by .',()=>{
    const parts = token.split(".")
    expect(parts.length).toEqual(3)
  })

  test('token should have length of 250 char or more',()=>{
    expect(token.length).toBeGreaterThanOrEqual(250)
  })

  test('issued token should be verified',()=>{
    const expected = {
      ...data,
      exp: verified['exp'],
      iat: verified['iat'],
      iss: config.jwtOptions.issuer
    }
    expect(verified).toEqual(expected)
  })

  test('token expiration time should use config',()=>{
    const expTime = verified['exp'] - verified['iat']
    expect(expTime).toEqual(config.jwtOptions.expiresIn)
  })
})