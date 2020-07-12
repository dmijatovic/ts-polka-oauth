import supertest from 'supertest'
import api from './api'

// jest.mock('../src/db/sql',()=>{
//   return {
//     getUserByEmail:(email:string)=>{
//       return Promise.resolve({
//         id:"test",
//         password:'password',
//         email
//       })
//     }
//   }
// })
// import {getUserByEmail} from '../src/db/sql'
// import getAccessToken from '../src/login/getAccessToken'

describe("Test oauth api points responses",()=>{
  let req:any

  beforeAll(()=>{
    req = supertest(api.handler)
  })

  describe(`route.../`,()=>{
    let r:any, route:string = "/"
    beforeAll(async done =>{
      r = await req.get(route)
      //Jest async flag need to be used
      done()
    })

    test('GET.../ should return 200',()=>{
      expect(r.status).toBe(200)
    })

    test('GET.../ response should not be empty', () =>{
      // console.log(r.text)
      expect(r.text.length).toBeGreaterThan(50)
    })
  })

  describe(`route.../login`,()=>{
    let r:any,route = "/login"
    test(`GET...${route} should return 400 error`,async (done) =>{
      r = await req.get(route)
      expect(r.status).toBe(400)
      //Jest async flag need to be used
      done()
    })
    // test(`POST...${route} should return token`,async(done)=>{
    //   // const getAccessToken = import
    //   const user={
    //     email:"demo.user@gmail.com",
    //     password: "password"
    //   }
    //   console.log(getUserByEmail)

    //   r = await req.post(route).send(user)
    //   expect(r.status).toBe(500)
    // })
  })
})