import type { FastifyPluginAsync } from "fastify"

export const healthAPI: FastifyPluginAsync = async (app) => {
  app.get("/", (_, reply) => {
    reply.status(200).send({
      status: 200,
      detail: "ok",
    })
  })
}

export const authAPI: FastifyPluginAsync = async (app) => {
  app.get("/whoami", (_, reply) => {
    reply.send({
      id: 1,
      name: "John Doe",
      email: "johdoe@gmail.com",
    })
  })
}
