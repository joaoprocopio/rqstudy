import type { Org } from "~/schemas/org"
import { orgSchema } from "~/schemas/org"
import { httpClient } from "~/services/clients/http"

async function getOrg(): Promise<Org> {
  const response = await httpClient.get("/api/org")

  return orgSchema.parse(response.data)
}

export const OrgServices = {
  getOrg,
}
