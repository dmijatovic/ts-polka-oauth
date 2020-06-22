import {ServerResponse} from 'http'
import {Request} from 'polka'
import {respOK,respErr} from '../utils'
// import {addUser,allUsers,updateUser,iUser} from '../db/sql'
import * as sql from '../db/sql'


function extractUserFromBody(req:any){
  const {body} = req
  if (body){
    const newUser:sql.iUser = {
      ...body
    }
    return newUser
  }
}

export function addNewUser(req:any,res:ServerResponse){
  const newUser = extractUserFromBody(req)
  if (newUser){
    sql.addUser(newUser)
      .then(user=>{
        respOK(res,user)
      })
      .catch(e=>{
        respErr(res,500,e.message)
      })
  }else{
    respErr(res,400,"Missing body")
  }
}

export function updateUser(req:any,res:ServerResponse){
  const userData = extractUserFromBody(req)
  if (userData && userData['id']){
    sql.updateUser(userData)
      .then(user=>{
        respOK(res,user)
      })
      .catch(e=>{
        respErr(res,500,e.message)
      })
  }else{
    respErr(res,400,"Missing body")
  }
}

export function deleteUser(req:any,res:ServerResponse){
  const userData = extractUserFromBody(req)
  if (userData && userData['id']){
    sql.deleteUserById(userData.id)
      .then(user=>{
        respOK(res,user)
      })
      .catch(e=>{
        respErr(res,500,e.message)
      })
  }else{
    respErr(res,400,"Missing body")
  }
}

export function deleteUserById(req:any,res:ServerResponse){
  const {id} = req.params
  if (id){
    sql.deleteUserById(id)
      .then(user=>{
        respOK(res,user)
      })
      .catch(e=>{
        respErr(res,500,e.message)
      })
  }else{
    respErr(res,400,"Missing body")
  }
}

export function getAllUsers(req:any,res:ServerResponse){
  sql.allUsers()
    .then(users=>{
      respOK(res,users)
    })
    .catch(e=>{
      respErr(res,500,e.message)
    })
}