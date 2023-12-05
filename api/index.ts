import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { userDataCache } from './data/demodata/cache'
import { enableDataEndpoint } from './routes/data'
import { enableSearchEndpoint } from './routes/search'
import { enableFacetsEndpoint } from './routes/facets'
//import { Project } from './data/demodata/types'

dotenv.config()

const router: Express = express()
const port = process.env.PORT || 8080
const cache = new userDataCache()

// router.get('/', (req: Request, res: Response) => {
//   cache
//     .getAllRecords()
//     .then(result => {
//       res.send(JSON.stringify(result))
//     })
//     .catch(err => {
//       res.send(err)
//     })
// })

// router.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
// })

init();

export async function init(): Promise<void> {
  try {
    const router: Express = express();
    const port = process.env.PORT || 8080;

    // Initialize user's git cache
    const cache = new userDataCache();

    // Activate search endpoint
    enableSearchEndpoint(router);
    // Activate data endpoint
    enableDataEndpoint(router);
    // Activate facets endpoint
    enableFacetsEndpoint(router);

    // Health check endpoint
    router.use("/", (req, res, next) => {
      cache
        .getAllRecords()
        .then(result => {
          res.send(result)
        })
        .catch(err => {
          res.send(err)
        })
    });

    router.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })

  } catch(ex) {
    console.error(ex)
  }
}
