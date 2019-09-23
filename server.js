const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

dotenv.config();
app.use(cors());

app.use(express.json({
  extended: false
}));
app.use('/api/auth', require('./routes/Auth/login'));
app.use('/api/auth', require('./routes/Auth/register'));
app.use('/api/users', require('./routes/Item/item'));

const PORT = process.env.PORT || 3500;

app.get('*', (req, res) => {
  res.status(404).send({
    message: '404 Page Not Found'
  })
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});