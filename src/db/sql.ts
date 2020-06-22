import pgdb from './pgdb'

export interface iUserProfile{
  id: string,
  roles: string,
  first_name: string,
  last_name: string,
  email: string,
  birth_date?: Date,
  create_date?: Date
}

interface iUser extends iUserProfile {
  password: string,
}

export function getUserByEmail(email:string){
  return pgdb.query("SELECT * FROM users WHERE email=$1 LIMIT 1",[email])
    .then(resp =>{
      // console.log("psql resp...", resp)
      if (resp.rowCount===1){
        const user:iUser = resp.rows[0]
        // console.log("psql user...", user)
        return user
      }else{
        throw Error("User not found!")
      }
    })
    .catch(e=>{
      // console.log(e)
      throw e
    })
}

export function extractUserProfileFromUser(user:iUser):iUserProfile{
  let userProfile={
    ...user
  }
  delete userProfile['password']
  return userProfile
}