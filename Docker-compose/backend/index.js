import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import typeorm from 'typeorm';
import { Routes } from './Users/routes.js';
import User from './Users/entity_users.js';

dotenv.config();

app.use(express.json());
app.use(cors({ origin: '*' }));

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log('Made with 🩶  By Sarah', `Server listening on : https://localhost:${PORT}`);
});

const dataSource = new typeorm.DataSource({
  type: 'postgres',
  host: 'postgres',  // Utilisez le nom du service Docker pour Postgres
  port: process.env.DB_PORT ,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
});

dataSource
  .initialize()
  .then(() => {
    console.log('connected');
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

export default dataSource;
Routes(app);
