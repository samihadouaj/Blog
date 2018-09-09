const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const users = require('./routes/Users');
const posts = require('./routes/Posts');
const comments = require('./routes/Comments');
const auth = require('./routes/Auth');
const Joi = require('joi');
const error = require('./middleware/error');
require('express-async-errors');
Joi.objectId = require('joi-objectid')(Joi);
const body_parser = require('body-parser');

const app = express();

/* process.on('uncaughtException', (ex) => {
    throw new Error(ex)
})

process.on('unhandledRejection', (ex) => {
   throw new Error(ex);

}) */

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

if(!config.get('jwtkey')) {
    console.log('FATAL ERROR: you must define a jwtkey');
    process.exit(1)
}


app.use(body_parser.json());
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use('/api/auth', auth);
app.use(error);


mongoose.connect('mongodb://localhost:27017/Blog', {useNewUrlParser: true})
.then(() => console.log('connected ...'));

const port = process.env.PORT|| 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

