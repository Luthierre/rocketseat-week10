const {Router} = require('express');
const DevController = require('./controllers/DevControllers');
const SearchController = require('./controllers/SearchController');
const routes = Router();

routes.get('/devs', DevController.index);
routes.get('/search', SearchController.index);
routes.put('/devs/:github_usermane', DevController.update);
routes.delete('/devs/:devId', DevController.destroy);
routes.post('/devs', DevController.store);

module.exports = routes;