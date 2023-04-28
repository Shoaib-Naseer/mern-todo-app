const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const connectDatabase = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

connectDatabase();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
