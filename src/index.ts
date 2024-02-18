import { Hono } from 'hono'

const app = new Hono()

async function AuthMiddleware(c:any, next:any){
  if (c.req.header("Authorization")) {
    // Do validation
    await next()
  } else {
    return c.text("You dont have acces");
  }
}



app.get('/user', AuthMiddleware, async (c) => {
  const body = await c.req.parseBody()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.json({msg: "as"})
})


app.get('/', (c) => {
  return c.text('Hello Hono!')
})


export default app
