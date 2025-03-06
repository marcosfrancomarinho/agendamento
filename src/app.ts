import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { HandleErrorMiddlewares } from './middlewares/HandleErrorMiddlewares';
import { Router } from './routers/Router';

const port: number = Number(process.env.PORT ?? '8000');
const app = express();

app.use(cors());
app.use(express.json());
Router.Initializer(app);
app.use(HandleErrorMiddlewares.catch);

app.listen(port, () => console.log(`server online on http://localhost:${port}`));
