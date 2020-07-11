import {IncomingMessage, ServerResponse} from 'http'
import polka, {Polka, Request} from 'polka'
import {json} from 'body-parser'
import process from 'process'

import {respErr, respOK} from './utils/utils'
import config from './api.config.json'
import home from './home/home'
import getAccessToken from './login/getAccessToken'
import {
  addNewUser, getAllUsers,
  updateUser, deleteUser,
  deleteUserById
} from './users/users'
import verifyBearerToken, {verifyUser} from './verify/verifyBearerToken'

export const PORT = process.env.API_PORT || config.apiPort || 5000

const api:Polka = polka()
  .use(json())

// Home route (not protected)
api.get("/",home)

// Protected routes comming after
// verifyUser middleware is applied
api.use(verifyUser)

// CONFIG route (just showing server config)
api.get("/config",(req:IncomingMessage,res:ServerResponse)=>{
  respOK(res,config)
})

// LOGIN routes
api.get("/login",(req:IncomingMessage,res:ServerResponse)=>{
  respErr(res,400,"GET method not supported. Try POST.")
})
api.post("/login",getAccessToken)

// USERS routes (CRUD on users)
api.get("/users", getAllUsers)
api.post("/users", addNewUser)
api.put("/users", updateUser)
api.delete("/users/:id", deleteUserById)
api.delete("/users", deleteUser)

// VERIFY routes (GET and POST)
// called by other services to verify token
// authenticity and validity
api.get("/verify",verifyBearerToken)
api.post("/verify",verifyBearerToken)

export default api