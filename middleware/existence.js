const {User} = require('../models/user');
module.exports =  async function(req,res,next) {
    const emails = await User.find({email: req.body.email});
    const names = await User.find({name: req.body.name});
    
    if(names.length != 0 ) {
        console.log(names.length)
        return res.send(JSON.stringify('this name is already used'));
    }

    if(emails.length != 0 ) {
        console.log(emails.length)
       return res.send(JSON.stringify('this email is already in use'));
    }

    if((emails.length != 0) && (names.length != 0 )) {
        return res.send(JSON.stringify('the given name and email are already in use'));
    }
    
    if (emails.length == 0 && names.length == 0) {
        return next();
    }
}