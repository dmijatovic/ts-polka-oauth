import { respOK, respErr, respServerError, logInfo, logError } from './utils'
import { ServerResponse, IncomingMessage } from 'http'
import { Socket } from "net";

describe("utils/utils.ts",()=>{
  const socket = new Socket()
  const req = new IncomingMessage(new Socket)
  const res:ServerResponse = new ServerResponse(req)

  beforeAll(()=>{
    //mock writeHead
    res.writeHead = jest.fn()
    //mock end (response)
    res.end = jest.fn()
  })

  test("respOK calls writeHeaderwith 200,{...}",()=>{
    respOK(res,{data:"test data"})
    expect(res.writeHead).toBeCalledWith(200,
      {"Content-Type": "application/json", "x-server": "polka-nodejs"}
    )
  })

  test("respOK responds with JSON data",()=>{
    const data = {data:"test data"}
    const response={
      status:200,
      statusText:"OK",
      payload: data
    }
    respOK(res, data)
    expect(res.end).toBeCalledWith(JSON.stringify(response))
  })

  test("respErr responds with provided error status and statusText",()=>{
    const response={
      status:404,
      statusText:"Not found",
      payload: null
    }
    respErr(res, response.status,response.statusText)
    expect(res.end).toBeCalledWith(JSON.stringify(response))
  })

  test("respServerErr responds with Server error",()=>{
    const response={
      status:500,
      statusText:"Server error",
      payload: null
    }
    respServerError(res)
    expect(res.end).toBeCalledWith(JSON.stringify(response))
  })

  test("logInfo writes message to stdout",()=>{
    const message="INfo message here"
    process.stdout.write = jest.fn()
    logInfo(message)
    expect(process.stdout.write).toBeCalledWith(message)
  })

  test("logError writes error message to stderr",()=>{
    const message="Error message here"
    process.stderr.write = jest.fn()
    logError(message)
    expect(process.stderr.write).toBeCalledWith(message)
  })

})