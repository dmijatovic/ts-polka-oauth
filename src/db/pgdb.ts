import {Pool} from 'pg'

import config from '../api.config.json'

const pool = new Pool(config.pgOptions)
// const pool = new Pool({
//   user:"postgres",
//   password: "changeme",
//   host: "localhost",
//   port: 5432,
//   database:"pern_todo"
// })

export default pool