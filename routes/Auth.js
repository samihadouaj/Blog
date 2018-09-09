const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const Joi = require('joi');
router.post('/', async(req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('invalid email or password');

    const verif = await bcrypt.compare(req.body.password, user.password);
    if(!verif) return res.status(400).send('invalid email or password');
    const token = user.generateToken();
    let  response = JSON.stringify({token: token });
    res.send(response);
});

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router;
