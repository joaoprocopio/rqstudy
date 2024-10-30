import { httpClient } from "~/services/clients/http"

async function getOrg() {
  const response = await httpClient.get("/api/org")

  return response.data
}

export const OrgServices = {
  getOrg,
}
