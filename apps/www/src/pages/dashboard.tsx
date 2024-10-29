import type { QueryClient } from "@tanstack/react-query"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { useLoaderData } from "react-router-dom"

import { DashboardServices } from "~/services/dashboard"

export default function Dashboard() {
  const loaderData = useLoaderData()
  const dashboardQuery = useQuery({
    ...query,
    initialData: loaderData.members,
  })

  return (
    <div>
      {dashboardQuery.isError && <p>Error</p>}
      {dashboardQuery.isLoading && <p>Loading...</p>}
      {dashboardQuery.isSuccess && <pre>{JSON.stringify(dashboardQuery.data, null, 2)}</pre>}
    </div>
  )
}

const query = queryOptions({
  queryKey: ["dashboard"],
  queryFn: DashboardServices.listMembers,
})

export const loader = (queryClient: QueryClient) => () => {
  return {
    members: queryClient.ensureQueryData(query),
  }
}
