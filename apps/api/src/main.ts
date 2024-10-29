import { fastifyCors } from "@fastify/cors"
import { fastify } from "fastify"

const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
})

await app.register(fastifyCors)

app.addHook("onRequest", async () => {
  await new Promise((resolve) => setTimeout(resolve, 350))
})

app.get("/", async (_, reply) => {
  reply.send({
    status: 200,
    msg: "ok",
  })
})

app.listen({
  port: 8000,
})
