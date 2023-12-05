import express, { Express } from 'express'
import dotenv from 'dotenv'
import { userDataCache } from './data/demodata/cache'
import { enableDataEndpoint } from './routes/data'
import { enableSearchEndpoint } from './routes/search'
import { enableFacetsEndpoint } from './routes/facets'

dotenv.config()
init()

export function init(): void {
  try {
    const router: Express = express()
    const port = process.env.PORT || 8080

    // Initialize user's git cache
    const cache = new userDataCache()

    // Activate search endpoint
    enableSearchEndpoint(router)
    // Activate data endpoint
    enableDataEndpoint(router)
    // Activate facets endpoint
    enableFacetsEndpoint(router)

    // Health check endpoint
    router.use('/', (req, res) => {
      cache
        .getAllRecords()
        .then(result => {
          res.send(result)
        })
        .catch(err => {
          res.send(err)
        })
    })

    router.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  } catch (ex) {
    console.error(ex)
  }
}
