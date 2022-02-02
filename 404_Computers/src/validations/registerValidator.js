const { check, body } = require('express-validator');
const db = require('../database/models');
const User = db.User;

module.exports = [

    body('email')
    .custom(value => {
        return User.findOne({
            where: {
                email : value
            }
        })
        .then(user => {
            if(user){
                return Promise.reject("El Usuario ya está registrado")
            }
        })
    })
    .withMessage("el Email ingresado ya esta registrado."),

]