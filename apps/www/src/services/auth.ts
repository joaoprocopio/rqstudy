import type { User } from "~/schemas/user"
import { userSchema } from "~/schemas/user"
import { httpClient } from "~/services/clients/http"

async function getUser(): Promise<User> {
  const response = await httpClient.get("/api/auth/user")

  return userSchema.parse(response.data)
}

export const AuthServices = {
  getUser,
}
