import type { FastifyPluginAsync } from "fastify"

export const healthAPI: FastifyPluginAsync = async (app) => {
  app.get("/", (_, reply) => {
    reply.status(200).send({
      status: 200,
      detail: "ok",
    })
  })
}

export const orgAPI: FastifyPluginAsync = async (app) => {
  app.get("/", (_, reply) => {
    reply.send({
      name: "Moray Labs",
      abbr: "ML",
    })
  })
}

export const authAPI: FastifyPluginAsync = async (app) => {
  app.get("/user", (_, reply) => {
    reply.send({
      photoURL: null,
      email: "joao@www.com",
      name: "João Procópio",
      abbr: "JP",
    })
  })
}
