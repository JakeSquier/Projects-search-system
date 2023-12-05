import { z } from 'zod'

export const zDataRequest = z.object({
  ids: z.string().transform(x => x.split(',')),
})

export type DataRequest = z.infer<typeof zDataRequest>
