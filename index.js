// const express = require('express');
// const path = require('node:path');
// // const config = require('config');
// const cors = require('cors');
import express from 'express';
import path from 'node:path';
import cors from 'cors';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = console.log;

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/registration', (req, res) => {
  try {
    log(req.body);
    const { email, password } = req.body;

    res.status(201).json({
      email,
      password,
      token: '123456',
    });
  } catch (error) {
    console.log('Error: ', error);
  }
});

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`The server is running on the port: ${5000}`);
});
