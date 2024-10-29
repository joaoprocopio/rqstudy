export async function delay() {
  const MIN = 100
  const MAX = 600

  await new Promise((resolve) => {
    setTimeout(resolve, randomNumber(MIN, MAX))
  })
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
