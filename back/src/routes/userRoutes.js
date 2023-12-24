import express from 'express';
import UserController from '../controllers/userController.js';

const routes = express.Router();

routes.get('/users', UserController.listUsers);
// routes.get('/users/:id', UserController.findUserById);
routes.post('/user', UserController.getUser);
routes.post('/users', UserController.createUser);
// routes.put('/users/:id', UserController.updateUser);
// routes.delete('/users/:id', UserController.deleteUser);


export default routes;