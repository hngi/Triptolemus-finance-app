const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('./database/database');
require('dotenv').config();

app.use(cors());
app.use(express.json({ extended: false }));

// app.use(require('./routes/Auth/login'));
// app.use(require('./routes/Auth/register'));
app.use(require('./routes/Item/item'));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
