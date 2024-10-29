import fp from "fastify-plugin"

export const api = fp((app) => {
  app.get("/health", async (request, reply) => {
    reply.send("ok")
  })
})
