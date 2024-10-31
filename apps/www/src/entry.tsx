import "~/assets/styles/tailwind.css"

import { QueryClientProvider } from "@tanstack/react-query"
import { startTransition } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { ThemeProvider } from "~/hooks/use-theme"
import queryClient from "~/query/client"
import router from "~/router"

const rootEl = document.getElementById("__react")!
const root = createRoot(rootEl)

startTransition(() => {
  root.render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </QueryClientProvider>
    </ThemeProvider>,
  )
})
