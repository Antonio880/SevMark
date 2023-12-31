import express  from "express";
import users from './userRoutes.js';
import locals from './locationRoutes.js'
import sports from "./sportRoutes.js";

const routes = ( app ) => {

    app.route("/").get((req, res) => res.status(200).send("Teste Curso"));

    app.use(express.json(), users, locals, sports);
};

export default routes;