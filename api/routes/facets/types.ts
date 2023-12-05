import { z } from "zod";

export const zFacetsRequest = z.object({
  dataTag: z.enum(["all", "git"])
})