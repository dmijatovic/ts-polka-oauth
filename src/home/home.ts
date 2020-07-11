
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

export default (req:any,res:any)=>{
  res.end(homeHtml)
}