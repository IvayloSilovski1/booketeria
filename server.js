const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./database/database');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log(`Connected to mongoose...`));

app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: false
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const authorRouter = require('./routes/authors');
app.use('/authors', authorRouter);

const bookRouter = require('./routes/books');
app.use('/books', bookRouter);


const PORT = process.env.PORT | 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));