console.log('App started!!!');
import express from 'express';
import config from 'config';
const log = console.log;

const app = express();

const PORT = process.env.PORT || config.get('port');

app.use(express.json());

app.get('/', (_, res) => {
  return res.json({ message: 'success' });
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  log(`Email: ${email}, Password: ${password}`);

  res.json({
    email,
    password,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`The server is running on the port: ${PORT}`);
});
