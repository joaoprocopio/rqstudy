export async function delay() {
  await new Promise((resolve) => {
    setTimeout(resolve, randomNumber(35, 625))
  })
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
