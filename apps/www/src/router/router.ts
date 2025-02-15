import type { RouteObject } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"

import queryClient from "~/query/client"

const routes: RouteObject[] = [
  {
    path: "/",
    lazy: async () => {
      const { default: Root } = await import("~/root")

      return { Component: Root }
    },
    children: [
      {
        path: "",
        lazy: async () => {
          const { default: DefaultLayout, loader: defaultLayoutLoader } = await import(
            "~/layouts/default"
          )

          return { Component: DefaultLayout, loader: defaultLayoutLoader(queryClient) }
        },
        children: [
          {
            path: "analytics",
            children: [
              {
                path: "regionalidade",
                lazy: async () => {
                  const { default: AnalyticsRegionalidadePage } = await import(
                    "~/pages/analytics/regionalidade"
                  )

                  return {
                    Component: AnalyticsRegionalidadePage,
                  }
                },
              },
            ],
          },
        ],
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
