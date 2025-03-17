import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { HandleErrorMiddlewares } from './middlewares/HandleErrorMiddlewares';
import { Router } from './routers/Router';

const port: number = Number(process.env.PORT ?? '8000');
const app = express();

app.use(
  cors({
    methods: ['POST', 'GET'],
    origin: '*',
    allowedHeaders: ['Content-Type', 'token', "Authorization"],
    exposedHeaders: ['token'],
  })
);

app.use(express.json());
Router.Initializer(app);
app.use(HandleErrorMiddlewares.catch);

app.listen(port, () => console.log(`server online on http://localhost:${port}`));

