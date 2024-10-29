import { fastifyCors } from "@fastify/cors"
import { fastify } from "fastify"

import { authAPI, healthAPI, orgAPI } from "./api"
import { delayMiddleware } from "./middlewares"

const app = fastify({ logger: { transport: { target: "pino-pretty" } } })

await app.register(fastifyCors)
await app.register(delayMiddleware)
await app.register(healthAPI, { prefix: "/health" })
await app.register(authAPI, { prefix: "/api/auth" })
await app.register(orgAPI, { prefix: "/api/org" })

app.listen({ host: "localhost", port: 8000 })
