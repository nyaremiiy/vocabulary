const express = require('express');
const path = require('node:path');
// const config = require('config');
const cors = require('cors');
const log = console.log;

const app = express();

// const PORT = +config.get('port');

app.use(cors());
app.use(express.json());
app.use(express.static('var/task/client/build'));

// // app.post('/api/registration', (req, res) => {
// //   try {
// //     log(req.body);
// //     const { email, password } = req.body;

// //     res.status(201).json({
// //       email,
// //       password,
// //       token: '123456',
// //     });
// //   } catch (error) {
// //     console.log('Error: ', error);
// //   }
// // });

app.get('/', (_, res) => {
  const ppp = path.join('', '/var/task/client/build/index.html');
  res.sendFile(ppp);
  // res.json({
  //   dirname: __dirname,
  //   filename: __filename,
  //   processCwd: process.cwd(),
  //   ppp
  // });
});

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`The server is running on the port: ${5000}`);
});
