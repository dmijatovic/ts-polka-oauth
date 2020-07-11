import {signToken} from './jwt'

describe('JWT util',()=>{
  let token=""
  beforeAll(()=>{
    token = signToken({user:"username", email:"email@gmail.com"})
  })
  test('should create token with . in it',()=>{
    expect(token).toContain(".")
  })
  test('token should have length of 250 char or more',()=>{
    expect(token.length).toBeGreaterThanOrEqual(250)
  })
})