import {logInfo} from './utils/utils'
import api, {PORT} from './api'

api.listen(PORT, ()=>{
  console.log("Polka server on port",PORT)
  logInfo(`Polka server on port ${PORT}\n`)
})

// listen to container/process stop
// and stop polka server
process.on("SIGINT",()=>{
  // console.info("Closing node server on SIGINT")
  logInfo("Closing polka server on SIGINT\n")
  process.exit(0)
})

process.on("SIGTERM",()=>{
  // console.info("Closing node server on SIGTERM")
  logInfo("Closing polka server on SIGTERM\n")
  process.exit(0)
})