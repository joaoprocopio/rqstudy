import type { QueryClient } from "@tanstack/react-query"

export function loader(queryClient: QueryClient) {
  return function () {
    return {}
  }
}

export default function DashboardPage() {
  return <div className="container h-[15000px] py-6">Dashboard</div>
}
