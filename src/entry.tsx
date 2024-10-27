import "~/tailwind.css"

import { startTransition } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import router from "~/router"

const rootEl = document.getElementById("__react")!
const root = createRoot(rootEl)

startTransition(() =>
  root.render(
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />,
  ),
)
