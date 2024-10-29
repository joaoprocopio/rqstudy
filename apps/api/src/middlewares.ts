import fp from "fastify-plugin"

import { delay } from "./utils"

export const delayMiddleware = fp(async (app) => {
  app.addHook("onRequest", async () => {
    await delay()
  })
})
