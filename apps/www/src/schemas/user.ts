import { z } from "zod"

export type User = z.infer<typeof userSchema>

export const userSchema = z.object({
  photoURL: z.string().nullable(),
  email: z.string(),
  name: z.string(),
  abbr: z.string(),
})
