import express  from "express";
import users from './userRoutes.js';
import locals from './locationRoutes.js'
import sports from "./sportRoutes.js";
import marks from "./markRoutes.js";
import images from "./imageRoutes.js";
import avaliableTimes from "./avaliableTimeRoutes.js"

const routes = ( app ) => {

    app.route("/").get((req, res) => res.status(200).send("Teste Curso"));

    app.use(express.json(), users, images, locals, sports, marks, avaliableTimes);
};

export default routes;