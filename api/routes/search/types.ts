import { z } from "zod";

export const zSearchRequest = z.object({
  term: z.string()
})

export type SearchRequest = z.infer<typeof zSearchRequest>;