require('dotenv').config();
const {connect} = require('./utility/db');
const {trinsicInit} = require('./utility/trinsic');
const cors = require('cors');
const app = require('express')();
const bodyParser = require('body-parser');
const {login} = require('./controller/Login');
const {generate} = require('./controller/Generate');
const {verify} = require('./controller/Verify');

const PORT = 4000;
const database = connect();
const instance = trinsicInit();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', login);
app.post('/generate', (req, res, next) => {
    req.instance = instance;
    next();
} ,generate);
app.post('/verify', (req, res, next) => {
    req.instance = instance;
    next();
} ,verify);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});