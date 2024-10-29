import fp from "fastify-plugin"

export const healthAPI = fp((app) => {
  app.get("/health", (_, reply) => {
    reply.status(200).send({
      status: 200,
      detail: "ok",
    })
  })
})

export const authAPI = fp((app) => {
  app.get("/whoami", (_, reply) => {
    reply.send({
      id: 1,
      name: "John Doe",
      email: "johdoe@gmail.com",
    })
  })
})
