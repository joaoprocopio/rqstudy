// import { httpClient } from "~/services/clients/http"

async function delay(timeout: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, timeout)
  })
}

async function listMembers() {
  await delay(5000)

  return new Promise((resolve) => {
    resolve([
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
      },
    ])
  })
}

export const HomeServices = {
  listMembers,
}
