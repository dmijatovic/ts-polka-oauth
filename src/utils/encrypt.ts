import bcrypt from 'bcrypt'
import {hashOptions} from '../api.config.json'

export function hashValueSync(value:string):string{
  return bcrypt.hashSync(value,hashOptions.saltRounds)
}

export function compareValuesSync(value:string,hashed:string):boolean{
  return bcrypt.compareSync(value,hashed)
}

export function hashValue(value:string){
  return bcrypt.hash(value,hashOptions.saltRounds)
}

export function compareValues(value:string,hashed:string){
  return bcrypt.compare(value,hashed)
}
