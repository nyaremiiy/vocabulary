import express from 'express';
import path from 'node:path';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/config.js';

import mainPage from './routes/main.js';
import authRoute from './routes/auth.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = console.log;

const app = express();

const PORT = process.env.PORT || config.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose
  .connect(config.DB.url())
  .then(() => log('Connect to Database!'))
  .catch((error) => log(error));

// apiAuth.post('/registration');

app.use('/api/auth', authRoute);
app.use('/api/auth', authRoute);
app.use('/', mainPage);
app.use('*', mainPage);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`The server is running on the port: ${PORT}`);
});
