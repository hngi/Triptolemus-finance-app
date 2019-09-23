const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json({ extended: false }));
app.use(require('./routes/Auth/login'));
app.use(require('./routes/Auth/register'));
app.use(require('./routes/Item/item'));

const PORT = 3500;

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
