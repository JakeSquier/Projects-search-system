import moize from "moize";
import { userDataCache } from "../../data/demodata/cache";
import { Project } from "../../data/demodata/types";
import { unit } from "mathjs";

export const fetchEntryById = moize.promise(
  async (id): Promise<Project | null> => {
    const allEntries = await (new userDataCache()).getAllRecords();

    let entry: Project;
    for(entry of allEntries) {
      if(entry.id.toString() === id) {
        return entry;
      }
    }
    // If no matching entries were found return null
    return null;
  },
  {
    maxSize: 1000,
    maxAge: unit(15, "minutes").toNumber("ms")
  }
)