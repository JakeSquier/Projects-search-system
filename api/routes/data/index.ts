import { Express } from "express";
import { zDataRequest, DataRequest } from "./types";
import { fetchEntryById } from "./cache";
import { Project } from "../../data/demodata/types";

export function enableDataEndpoint(router: Express): void {
  router.use("/data", async (req, res, next) => {
    try {

      const dataRequestValidation = zDataRequest.safeParse(req.query);

      if(!dataRequestValidation.success) {
        const errors = dataRequestValidation.error.format();
        // Throw error for incorrect params
        res.send(errors);
        return;
      }

      const matchingEntries: Project[] = [];
      const ids = dataRequestValidation.data.ids

      for(const id of ids) {
        const match = await fetchEntryById(id);
        if(match) {
          matchingEntries.push(match);
        }
      }
  
      res.send(matchingEntries);
    } catch (ex) {
      next(ex);
    }
  })
}