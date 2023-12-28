import express from 'express';
import LocationDataController from '../controllers/locationDataController.js';

const routes = express.Router();

routes.get('/locals', LocationDataController.listLocationData);
// routes.get('/users/:id', LocationDataController.findUserById);
// routes.post('/user', LocationDataController.getUser);
routes.get("locals/sportName", LocationDataController.getLocationsBySport);
routes.get('/locals/busca', LocationDataController.findLocationByName);
routes.post('/locals', LocationDataController.createLocationData);
// routes.put('/users/:id', LocationDataController.updateUser);
// routes.delete('/users/:id', LocationDataController.deleteUser);


export default routes;