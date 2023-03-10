import express from 'express';
import config from 'config';
import cors from 'cors';
const log = console.log;

const app = express();

const PORT = process.env.PORT || config.get('port');

app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));

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

// app.get('/', (_, res) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`The server is running on the port: ${PORT}`);
});
