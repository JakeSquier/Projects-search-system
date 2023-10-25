import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { userDataCache } from './data/demodata/cache'
//import { Project } from './data/demodata/types'

dotenv.config()

const router: Express = express()
const port = process.env.PORT || 8080
const cache = new userDataCache()

router.get('/', (req: Request, res: Response) => {
  cache
    .getAllRecords()
    .then(result => {
      res.send(JSON.stringify(result))
    })
    .catch(err => {
      res.send(err)
    })
})

router.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
