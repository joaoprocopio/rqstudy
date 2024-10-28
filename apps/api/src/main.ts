import Fastify from "fastify"

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
})

app.get("/", async (request, reply) => {
  reply.send({
    status: 200,
    msg: "ok",
  })
})

app.listen({
  port: 8000,
})
