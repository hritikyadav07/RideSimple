const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.RegisterUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname, 
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user });

}

module.exports.LoginUser = async (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    //becoz on finding user password by default is not selected so we have to select it explicitly

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isValid = await user.comparePassword(password);

    if(!isValid){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.status(200).json({token, user});

}