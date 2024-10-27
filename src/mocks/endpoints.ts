import { http, HttpResponse } from "msw"

export const endpoints = [
  http.get("/api/v1/members", async () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
      },
    ])
  }),
]
