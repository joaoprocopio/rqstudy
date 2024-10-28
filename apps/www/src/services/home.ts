import { httpClient } from "~/services/clients/http"

async function listMembers() {
  const response = await httpClient.get("/v1/members")

  return response.data
}

export const HomeServices = {
  listMembers,
}
