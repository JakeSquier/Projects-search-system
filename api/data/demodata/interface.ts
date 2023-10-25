import { Project } from './types'

export interface UserDataInterface {
  /** Returns current status of the cache */
  isCacheValid(): boolean

  resetCache(): void

  getAllRecords(): Promise<Project[]>
}
