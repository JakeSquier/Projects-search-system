import { fetchUserData } from './fetch'
import { UserDataInterface } from './interface'
import { Project } from './types'

export class userDataCache implements UserDataInterface {
  constructor(minutesToLive: number = 10) {
    this.millisecondsToLive = minutesToLive * 60 * 1000
    this.cache = null
    this.fetchDate = new Date(0)
    this.fetchFunc = fetchUserData
  }

  /** Cache max age */
  private readonly millisecondsToLive: number

  /** Fetch date (timestamp of most recent hydration) */
  private fetchDate: Date

  /** */
  private fetchFunc: Function

  /** Cache data */
  private cache: Project[] | null

  /**
   * Returns current status of the cache
   * @returns {boolean}
   */
  isCacheValid(): boolean {
    return (
      this.fetchDate.getTime() + this.millisecondsToLive <
      new Date().getTime()
    )
  }

  /**
   * Invalidates the current cache,
   * and triggers a cache rehydration
   */
  resetCache(): void {
    this.fetchDate = new Date(0)
  }

  getAllRecords(): Promise<Project[]> {
    if (!this.cache || this.isCacheValid()) {
      console.log("Cache is invalid. Rehydrating")
      return this.fetchFunc()
        .then((data: Project[]) => {
          /** Populate cache */
          this.cache = data
          /** Update fetch data */
          this.fetchDate = new Date()
          /** Return data (is equivelant to hydrated cache) */
          return data
        })
        .catch((err: Error) => {
          console.error(err)
          /** If an error ocurred signify by returning an empty arr */
          return []
        })
    } else {
      console.log("Cache hit")
      return Promise.resolve(this.cache)
    }
  }

  /** TODO: Add func to get single record from cache */
}
