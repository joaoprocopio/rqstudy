import type { QueryClient, UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { defer, useLoaderData } from "react-router-dom"

import { HomeServices } from "~/services/home"

const homeQuery: () => UseQueryOptions = () => ({
  queryKey: ["home"],
  queryFn: HomeServices.listMembers,
})

type TLoaderData = { members: any }

export const loader = (queryClient: QueryClient) => () => {
  const query = homeQuery()

  return defer({
    members: queryClient.ensureQueryData(query),
  } satisfies TLoaderData)
}

export default function Home() {
  const loaderData = useLoaderData() as TLoaderData
  const { isError, isLoading, isSuccess, data } = useQuery({
    ...homeQuery(),
    initialData: loaderData.members,
  })
  console.log(data)

  return (
    <div>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
