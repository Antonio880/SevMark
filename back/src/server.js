import express from "express";
import http from "http";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

app.use(express.json());

routes(app);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
