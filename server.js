const express = require('express');
const swaggerUi= require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('./database/database');
require('dotenv').config();

const PORT = process.env.PORT || 3500;
const swaggerDefinition = {
    info: {
      version: "1.0.0",
      title: "triptolemus-finance-app",
      description: "",
      license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT"
      }
    },
    host: 'localhost:'+PORT,
    basePath: '/api/',
    securityDefinitions: {
        bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header'
      }
    }
  };
  const options = {
    swaggerDefinition,
    apis: [
      './routes/Auth/*.js',
      './routes/Item/*.js'
    ],
  };

  const swaggerSpec = swaggerJSDoc(options);

app.get('swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json({ extended: false }));
app.use(require('./routes/Auth/login'));
app.use(require('./routes/Auth/register'));
app.use(require('./routes/Item/getItems'));
app.use(require('./routes/Item/addItems'));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
