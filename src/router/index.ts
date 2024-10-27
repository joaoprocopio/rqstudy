import type { RouteObject } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"

const routes: RouteObject[] = [
  {
    path: "/",
    lazy: async () => {
      const { default: Root } = await import("~/root")

      return {
        Component: Root,
      }
    },
    children: [
      {
        path: "",
        lazy: async () => {
          const { default: Home, loader: homeLoader } = await import("~/routes/home")
          return {
            Component: Home,
            loader: homeLoader(),
          }
        },
      },
    ],
  },
]

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
})

export default router
