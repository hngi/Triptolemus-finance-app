const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json({ extended: false }));

const PORT = 3500;

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
