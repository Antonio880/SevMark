import express from 'express';
import MarkController from '../controllers/markController.js';

const routes = express.Router();

routes.get('/marks', MarkController.listMarks);
routes.get("/marks/buscaLocalId", MarkController.findMarkByLocalID);
routes.get("/marks/buscaUserId", MarkController.findMarkByUserId);
routes.get('/marks/:id', MarkController.findMarkById);
// routes.post('/user', MarkController.getUser);

routes.post('/marks', MarkController.createMark);
// routes.put('/users/:id', MarkController.updateUser);
// routes.delete('/users/:id', MarkController.deleteUser);


export default routes;