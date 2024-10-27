import type { QueryClient, UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { defer, useLoaderData } from "react-router-dom"

import { HomeServices } from "~/services/home"

const homeQuery: () => UseQueryOptions = () => ({
  queryKey: ["home"],
  queryFn: HomeServices.listMembers,
})

export const loader = (queryClient: QueryClient) => () => {
  const query = homeQuery()

  return defer({
    members: queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query),
  })
}

export default function Home() {
  const loaderData = useLoaderData()
  const membersQuery = useQuery({
    ...homeQuery(),
    initialData: loaderData.members,
  })

  return (
    <div>
      {membersQuery.isError && <p>Error</p>}
      {membersQuery.isLoading && <p>Loading...</p>}
      {membersQuery.isSuccess && <pre>{JSON.stringify(membersQuery.data, null, 2)}</pre>}
    </div>
  )
}
