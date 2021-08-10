const user = require('../model/User');

module.exports.login = (req, res) => {
    console.log('Trying to login...');
    // console.log(req.body);

    user.findOne({}, (error, data) => {
        if(error) throw error;
        
        if(data.username === req.body.username && data.password === req.body.password) {
            res.status(200).send({status: 'ok'});
        } else{
            res.status(400).send({status: 'not ok'});
        }
    });
}