import { Polka } from 'polka'
import {respOK,respErr} from './utils'
import config from './auth.config.json'
import verifyBearerToken, {verifyUser} from './routes/verifyBearerToken'
import getAccessToken from './routes/getAccessToken'
import {addNewUser, getAllUsers,
  updateUser, deleteUser,
  deleteUserById } from './routes/users'

export default (app:Polka) => {
  // auth
  app.use(verifyUser)

  app.get("/config",(req,res)=>{
    respOK(res,config)
  })

  // user login and token validation
  app.get("/login",(req,res)=>{
    respErr(res,400,"GET method not supported. Try POST.")
  })
  app.post("/login",getAccessToken)
  app.post("/verify",verifyBearerToken)

  // users routes (CRUD on users)
  app.get("/users", getAllUsers)
  app.post("/users", addNewUser)
  app.put("/users", updateUser)
  app.delete("/users/:id", deleteUserById)
  app.delete("/users", deleteUser)
}


