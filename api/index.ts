const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect('mongodb+srv://davouma13:davouma13@cluster0.7fkbve5.mongodb.net/')
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error: any) => {
    console.log('Error connecting to mongoDB', error);
  });

app.listen(port, () => {
  console.log('server is running on port 8000');
});
