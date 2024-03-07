import express from 'express';
import multer from "multer";
import upload from "../config/multer.js";
import ImageController from '../controllers/imagesController.js';
const routes = express.Router();

routes.post("/images", upload.single("file"), ImageController.createImage);
routes.get("/images", ImageController.listImages);
routes.get("/images/busca", ImageController.findImagesByLocalId);
routes.delete("/images/:id", ImageController.removeImage);

export default routes;