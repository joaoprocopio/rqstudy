import type { QueryClient } from "@tanstack/react-query"

export function loader(queryClient: QueryClient) {
  return function () {
    return {}
  }
}

export default function DashboardPage() {
  return <div>dashboard</div>
}
