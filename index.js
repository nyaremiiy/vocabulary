const express = require('express');
const config = require('config');
// const cors = require('cors');
const log = console.log;

const app = express();

const PORT = +config.get('port');
log()

// app.use(cors());
// app.use(express.json());
// // app.use(express.static('client/build'));

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

// // app.get('/', (_, res) => {
// //   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// // });
app.get('/', (req, res) => {
  res.send('Express on Vercel');
});

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`The server is running on the port: ${PORT}`);
});





