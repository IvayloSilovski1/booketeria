const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./database/database');


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.database, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const router = require('./routes/index')
app.use('/', router);

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));