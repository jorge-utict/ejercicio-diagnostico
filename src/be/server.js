const express = require('express');
const routerApi = require('./routes'); 
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

routerApi(app);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
