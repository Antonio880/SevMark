import express  from "express";
import users from './userRoutes.js';
import locals from './locationRoutes.js'
import sports from "./sportRoutes.js";
import marks from "./markRoutes.js";
import images from "./imageRoutes.js";
import avaliableTimes from "./avaliableTimeRoutes.js"
import checkToken from "../models/auth.js"
import UserController from "../controllers/userController.js";

const routes = ( app ) => {

    app.use(checkToken);

    app.use(users, images, locals, sports, marks, avaliableTimes);
};

export default routes;