const express = require('express');
const app = express();
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

// app.use('/', express.static('src/app/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(cors());
app.use(expressValidator());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header('Access-Control-Expose-Headers', 'x-access-token'); //essta linha habilita o token no header
    next();
});

consign({cwd: 'src/app'})
    .then('routes/auth.js')
    .then('routes')
    .into(app);

module.exports = app;