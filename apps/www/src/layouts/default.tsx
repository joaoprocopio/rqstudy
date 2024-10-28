import { Outlet } from "react-router-dom"

import Sidenav from "~/components/app/sidenav"

export default function Default() {
  return (
    <div>
      <Sidenav />

      <Outlet />
    </div>
  )
}
