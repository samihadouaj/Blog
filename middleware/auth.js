const jwt = require('jsonwebtoken');
const config  = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {

      return res.status(400).send('you have to give a token')
    }
  try{

        const decoded = jwt.verify(token, config.get('jwtkey'));
        console.log('ok');
        next();
    } 
    catch(ex) 
    {
         res.status(400).send('INVALID TOKEN');
    }


};
