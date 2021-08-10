const mongoose = require('mongoose');

const CONNECTION = 'mongodb+srv://admin:admin@123@cluster0.y49mz.mongodb.net/did?retryWrites=true&w=majority';

module.exports.connect = () => {
    mongoose.connect(CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to database');
    })
    .catch(error => {
        console.error('Mongoose connection: ', error);
    });

    return mongoose;
}