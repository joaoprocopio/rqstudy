import fp from "fastify-plugin"

import { delay, randomNumber } from "./utils"

export const delayMiddleware = fp(async (app) => {
  app.addHook("onRequest", async () => {
    await delay(randomNumber(150, 600))
  })
})
