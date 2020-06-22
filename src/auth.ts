import { Polka } from 'polka'
import { ServerResponse } from 'http'
import {respOK,respErr} from './utils'
import config from './auth.config.json'
import {signToken, verifyToken} from './jwt'
import {getUserByEmail, extractUserProfileFromUser, iUserProfile} from './db/sql'
import {compareValues} from './encrypt'
import verifyBearerToken from './routes/verifyBearerToken'
import getAccessToken from './routes/getAccessToken'


function getToken(req:any,res:ServerResponse){
  const {body} = req
  // console.log("req...", req)
  if (body){
    let userProfile:iUserProfile
    // console.log("req.body...", body)
    getUserByEmail(body['email'])
      .then(user=>{
        const {password} = user
        if (password){
          //extract user profile
          userProfile=extractUserProfileFromUser(user)
          //validate password
          return compareValues(body['password'],password)
        }else{
          respErr(res,500,"Could not find user")
        }
      })
      .then(valid => {
        // console.log("Valid password...", valid)
        if (valid){
          // create access_token
          const access_token = signToken(userProfile)
          respOK(res, {access_token})
        } else {
          respErr(res,403,"User email or password incorrect")
        }
      })
      .catch(e=>{
        respErr(res,404,e.message)
      })
  }else{
    respErr(res,400,"Missing body")
  }
}

// function verifyBearerToken(req:any,res:ServerResponse){
  
// }


export default (app:Polka) => {
  app.get("/config",(req,res)=>{
    // res.end("This is auth test")
    respOK(res,config)
  })
  app.get("/login",(req,res)=>{
    respErr(res,400,"GET method not supported. Try POST.")
  })

  app.post("/login",getAccessToken)

  app.post("/verify",verifyBearerToken)

  // app.post("/users", addNewUser)
}


