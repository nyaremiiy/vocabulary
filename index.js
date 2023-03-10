import express from 'express';
import path from 'node:path';
import cors from 'cors';
import config from 'config';




import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = console.log;

const app = express();

log('Port:', config.get('port'))


const PORT = process.env.PORT|| config.get('port') || 5000;


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

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`The server is running on the port: ${PORT}`);
});
