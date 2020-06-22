import { Polka } from 'polka'
import {respOK,respErr} from './utils'
import config from './auth.config.json'
import verifyBearerToken from './routes/verifyBearerToken'
import getAccessToken from './routes/getAccessToken'
import {addNewUser, getAllUsers, 
  updateUser, deleteUser, 
  deleteUserById } from './routes/users'

export default (app:Polka) => {
  app.get("/config",(req,res)=>{
    respOK(res,config)
  })
  app.get("/login",(req,res)=>{
    respErr(res,400,"GET method not supported. Try POST.")
  })

  app.post("/login",getAccessToken)

  app.post("/verify",verifyBearerToken)

  app.get("/users", getAllUsers)
  app.post("/users", addNewUser)
  app.put("/users", updateUser)
  app.delete("/users", deleteUser)
  app.delete("/users/:id", deleteUserById)
}


