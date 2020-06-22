import polka, {Polka} from 'polka'
import {json} from 'body-parser'

import config from './auth.config.json'
import auth from './auth'

const PORT = process.env.API_PORT || config.apiPort || 5000
const app:Polka = polka()
  .use(json())

const homeHtml=`
  <style>
    body{
      font-family: 'Roboto', sans-serif;
      line-height: 1.5rem;
    }
    h1{
      padding: 1rem;
      color: red;
    }
    section{
      padding: 1rem;
    }
  </style>
  <h1>Welcome to Polka auth server</h1>
  <section>
    <p>This authentication server should be the lightest and the fastest auth sever
    on the world :-). Why?
    </p><p>
    Because it has small footprint and runs in
    smallest Docker container possible. The assumption is that
    this approach should deliver the fastest auth server.
    </p>
  </section>
`

app.get("/",(req,res)=>{
  res.end(homeHtml)
})

auth(app)

app.listen(PORT, ()=>{
  console.log("Node server on port ",PORT)
})