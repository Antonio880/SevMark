import express from "express";
import http from "http";
import "dotenv/config";
import UserController from "./controllers/userController.js";
import cors from "cors";
import routes from "./routes/index.js";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

app.use("/uploads",express.static("./uploads"))

app.route('/user').post(UserController.getUser); // Use .post() para rotas POST
app.route('/users').post(UserController.createUser); // Use .post() para rotas POST

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

routes(app);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
