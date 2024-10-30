import { httpClient } from "~/services/clients/http"

async function getUser() {
  const response = await httpClient.get("/api/auth/user")

  return response.data
}

export const AuthServices = {
  getUser,
}
