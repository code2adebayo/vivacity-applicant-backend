import express, { Request, Response } from "express";
import cors from "cors";
import { postgres_connection } from './models/_config'
import { routes } from './routes/index.route';
export const app = express();

app.use(express.json());
app.use(cors());
postgres_connection();
routes(app);
