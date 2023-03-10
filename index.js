import express from 'express';
import path from 'node:path';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/config.js';
import User from './models/User.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

app.post('/api/registration', async (req, res) => {

  try {
    log(req.body)
    const { email, password } = req.body;

    const isUsedEmail = await User.findOne({ email });

    if (isUsedEmail) {
      return res
        .status(300)
        .json({ message: 'Такий email уже зареєстрований, спробуйте інший.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email,
      password: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.secret,
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалося зареєструвати користвача.',
    });
  }
});

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
app.get('*', function (_, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`The server is running on the port: ${PORT}`);
});
