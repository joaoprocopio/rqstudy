import { useLoaderData } from "react-router-dom"

export const loader = () => () => {
  return {
    foo: "bar",
    fizz: "buzz",
  }
}

export default function Home() {
  const data = useLoaderData() as ReturnType<typeof loader>

  console.log(data)

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
