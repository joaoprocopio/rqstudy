import { fastifyCors } from "@fastify/cors"
import { fastify } from "fastify"

import { authAPI, healthAPI } from "./api"
import { delayMiddleware } from "./middlewares"

const app = fastify({ logger: { transport: { target: "pino-pretty" } } })

await app.register(fastifyCors)
await app.register(delayMiddleware)
await app.register(healthAPI, { prefix: "/health" })
await app.register(authAPI, { prefix: "/api/auth" })

app.listen({ host: "localhost", port: 8000 })
