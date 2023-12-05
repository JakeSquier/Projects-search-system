import { Express } from 'express'
import { zSearchRequest } from './types'

export function enableSearchEndpoint(router: Express): void {
  router.use('/search', (req, res, next) => {
    try {
      const searchRequestValidation = zSearchRequest.safeParse(req.query)
      if (!searchRequestValidation.success) {
        const errors = searchRequestValidation.error.format()
        //Throw error for incorrect params
        next(errors)
        return
      }

      res.send(searchRequestValidation.data.term)
    } catch (ex) {
      next(ex)
    }
  })
}
