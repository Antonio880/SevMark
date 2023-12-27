import express from 'express';
import SportController from '../controllers/sportController.js';

const routes = express.Router();

routes.get('/sports', SportController.listSports);

export default routes;