import jwt from 'jsonwebtoken'
import {jwtOptions, privateKey} from './auth.config.json'
/**
 * Create signed token using jsonwebtoken library.
 * The token expires after 1 hour
 * @param user
 */
export function signToken(data:object){
  const token = jwt.sign(data, privateKey, jwtOptions as jwt.SignOptions)
  return token
}

/**
 * Validate if request has JWT token in the header and
 * if token is not expired
 * @param {Express.Request} req express request object
 * @param {Express.Response} res  express respose object
 * @param {Function} next express next function
 */
// export function validateToken(req, res, next){
//   try{
//     //get authorization header
//     const bearerHeader =  req.headers['authorization']
//     // if token not provided
//     if (typeof bearerHeader === "undefined"){
//       return res.status(403).json({
//         message:'Not allowed without bearer token'
//       })
//       //return false
//     }
//     //if authorisation header provided
//     const bearer = bearerHeader.split(" ")
//     let token = bearer[1]
//     if (!token){
//       return res.status(403).json({
//         message:'Not allowed without bearer token'
//       })
//       //return false
//     }
//     //if token value provided
//     //verify token
//     const data = jwt.verify(token, privateKey)
//     console.log("data decoded...", data)
//     //attach verifyed token to request
//     req.token = token
//     // req.user = data.user
//     //request can continue
//     next()
//   }catch(e){
//     return res.status(403).json({
//       message:`Invalid token provided: ${e}`
//     })
//     //return false
//   }
// }
export function verifyToken(token:string){
  return jwt.verify(token, privateKey)
}