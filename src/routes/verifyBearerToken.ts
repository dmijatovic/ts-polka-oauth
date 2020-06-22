import { ServerResponse } from 'http'
import {verifyToken} from '../jwt'
import {JsonWebTokenError} from 'jsonwebtoken'
import {respOK,respErr} from '../utils'

export default (req:any,res:ServerResponse)=>{
  const errMsg = 'Not allowed without bearer token as authorization header'
  const bearerHeader =  req.headers['authorization']
  if (typeof bearerHeader === "undefined"){
    respErr(res,403, errMsg)
  }
  const bearer = bearerHeader?.split(" ")
  if (bearer){
    let token = bearer[1]
    if (!token){
      respErr(res,403,errMsg)
    } else{
      // console.log("verify token...", token)
      let profile
      try{
        profile = verifyToken(token)
      }catch(e){
        const {name,message} = e
        if (name==='TokenExpiredError'){
          respErr(res,403,'Token expired, renew it please')
        }else{
          respErr(res,403,'Invalid bearer token')
        }
      }
      if (profile){
        respOK(res,{profile, token})
      }else{
        respErr(res,403,'Invalid bearer token')
      }
    }
  }else{
    respErr(res,403,errMsg)
  }
}