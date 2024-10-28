import type { RouteObject } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"

import queryClient from "~/query/client"

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
        path: "dashboard",
        lazy: async () => {
          const { default: Dashboard, loader: dashboardLoader } = await import("~/routes/dashboard")

          return {
            Component: Dashboard,
            loader: dashboardLoader(queryClient),
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
