import { z } from "zod"

export type Org = z.infer<typeof orgSchema>

export const orgSchema = z.object({
  name: z.string(),
  abbr: z.string(),
})
