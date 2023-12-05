import { Express } from "express";
import { zFacetsRequest } from "./types";
import { getFacets } from "./cache";

export function enableFacetsEndpoint(router: Express): void {
  router.use("/facets", async (req, res, next) => {
    try {
      const facetsRequestValidation = zFacetsRequest.safeParse(req.query);

      if(!facetsRequestValidation.success) {
        const errors = facetsRequestValidation.error.format();
        // Throw error for incorrect params
        res.send(errors);
        return;
      }

      const dataTag = facetsRequestValidation.data.dataTag;
      const facets = await getFacets();
      
      res.send(facets);
    } catch (ex) {
      next(ex);
    }
  })
}