import {hashValue,compareValues, hashValueSync, compareValuesSync} from './encrypt'
describe("utils/encrypt.ts",()=>{

  describe("sync hashing",()=>{
    let hash:string = ""
    const pass:string = "password"

    beforeAll(()=>{
      hash = hashValueSync(pass)
      // console.log("hash:", hash)
    })

    test("should encrypt password",()=>{
      expect(hash?.length).toBeGreaterThan(pass.length)
    })

    test("compareValuesSync should return match",()=>{
      const match = compareValuesSync(pass, hash)
      expect(match).toBe(true)
    })
    test("compareValuesSync should NOT return match",()=>{
      const match = compareValuesSync("fake-pass", hash)
      expect(match).toBe(false)
    })
  })

  describe("Async hashing",()=>{
    let hash:string = ""
    const pass:string = "password"

    beforeAll(()=>{
      return hashValue(pass)
        .then(h=>{
          hash = h
        })
    })

    test("should encrypt password",()=>{
      expect(hash.length).toBeGreaterThan(pass.length)
    })

    test("compareValues should return match",()=>{
      return compareValues(pass, hash)
        .then(res=>{
          expect(res).toBe(true)
        })
    })
    test("compareValuesSync should NOT return match",()=>{
      return compareValues("fake-pass", hash)
        .then(res=>{
          expect(res).toBe(false)
        })
    })
  })
})