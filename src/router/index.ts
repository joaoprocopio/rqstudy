import type { RouteObject } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"

const routes = [
  {
    path: "/",
    lazy: async () => {
      const { default: Component } = await import("~/pages/home")

      return {
        Component: Component,
      }
    },
  },
] as const satisfies RouteObject[]

export const router = createBrowserRouter(routes)
