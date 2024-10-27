import "~/tailwind.css"

import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { router } from "~/router"

const rootEl = document.getElementById("__react")!
const root = createRoot(rootEl)

root.render(<RouterProvider router={router} />)
