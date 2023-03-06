console.log('App started!!!');
import express from 'express';
import config from 'config';
const log = console.log;

const app = express();

const PORT = process.env.PORT || config.get('port');

app.use(express.json());
app.use(express.static('client/build'));


app.post('/api/registration', (req, res) => {
  const { email, password } = req.body;

  log(`Email: ${email}, Password: ${password}`);

  res.json({
    email,
    password,
  });
});

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`The server is running on the port: ${PORT}`);
});









