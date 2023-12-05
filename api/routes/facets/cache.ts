import moize from "moize";
import { userDataCache } from "../../data/demodata/cache";
import { Project } from "../../data/demodata/types";
import { unit } from "mathjs";

export const getFacets = moize.promise(
  async (): Promise<{[field: string]: unknown[]}> => {
    const allEntries = await (new userDataCache()).getAllRecords();

    // TODO - Move this into an index definition
    const facets: {[field: string]: unknown[]} = {
      "id": [],
      "name": [],
      "fullName": [],
      "repoUrl": [],
      "repoSize": [],
      "primaryLanguage": [],
    };

    let entry: Project;
    for (entry of allEntries) {
      for (const [key, value] of Object.entries(entry)) {

        if(
          value && 
          facets[key] && 
          !facets[key].includes(value)
        ) {
          console.log(value)
          facets[key].push(value)
        }
      }
    }

    return facets;
  },
  {
    maxAge: unit(15, "minutes").toNumber("ms")
  }
)