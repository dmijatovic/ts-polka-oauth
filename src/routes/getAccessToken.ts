import { ServerResponse } from 'http'
import {
  getUserByEmail,
  extractUserProfileFromUser,
  iUserProfile} from '../db/sql'

import {signToken} from '../jwt'
import {compareValues} from '../encrypt'
import {respOK,respErr} from '../utils'

export default(req:any,res:ServerResponse)=>{
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