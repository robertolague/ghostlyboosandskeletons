const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');

dotenv.config({ path: './.env'});

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(favicon(path.join(__dirname, './public/favicon.ico')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');

const dbUrl = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB is connected');
  } catch (error) {
    console.log('Error connecting to Database');
  }
}

connectDB();

app.use('/', require('./routes/pages'));
app.use('/products', require('./routes/products'));
app.use('/checkout', require('./routes/checkout'));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
})