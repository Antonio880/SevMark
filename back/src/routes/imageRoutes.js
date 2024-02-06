import express from 'express';
import multer from "multer";
import multerConfig from "../config/multer.js";
import ImageController from '../controllers/imagesController.js';
const routes = express.Router();

routes.post('/images', multer(multerConfig).single('file'), ImageController.createImage);
//routes.post('/images', LocationDataController.createLocationData);

export default routes;