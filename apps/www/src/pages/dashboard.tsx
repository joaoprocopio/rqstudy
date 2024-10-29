import type { QueryClient } from "@tanstack/react-query"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { defer, useLoaderData } from "react-router-dom"

import { DashboardServices } from "~/services/dashboard"

const query = queryOptions({
  queryKey: ["dashboard"],
  queryFn: DashboardServices.listMembers,
})

export const loader = (queryClient: QueryClient) => () => {
  return defer({
    members: queryClient.ensureQueryData(query),
  })
}

export default function Dashboard() {
  const loaderData = useLoaderData()
  const { isError, isLoading, isSuccess, data } = useQuery({
    ...query,
    initialData: loaderData.members,
  })

  return (
    <div>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
