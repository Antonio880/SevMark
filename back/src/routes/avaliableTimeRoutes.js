import express from 'express';
import AvailableTimeController from '../controllers/avaliableTimesController.js';

const routes = express.Router();

routes.get('/avaliableTimes', AvailableTimeController.listAvailableTimes);
/* routes.get("/avaliableTimes/sportName", AvailableTimeController.getLocationsBySport);*/
routes.get('/avaliableTimes/busca', AvailableTimeController.findAvaliableTimeByLocalId);
routes.get('/avaliableTimes/:id', AvailableTimeController.findAvailableTimeById);
// routes.post('/user', AvailableTimeController.getUser);

routes.post('/avaliableTimes', AvailableTimeController.createAvailableTimes);
routes.put('/avaliableTimes', AvailableTimeController.updateAvailableTime);
// routes.delete('/users/:id', AvailableTimeController.deleteUser);


export default routes;