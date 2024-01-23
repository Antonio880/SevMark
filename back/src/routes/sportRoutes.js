import express from 'express';
import SportController from '../controllers/sportController.js';

const routes = express.Router();

routes.get('/sports', SportController.listSports);
routes.get("/sports/busca", SportController.findSportByLocalId);
routes.post('/sports',SportController.createSport);

export default routes;