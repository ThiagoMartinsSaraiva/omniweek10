const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ message: "Hello World" })
})
routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.delete('/devs/:id', DevController.remove)

routes.get('/search', SearchController.index)

module.exports = routes