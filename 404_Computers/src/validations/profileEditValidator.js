const { check, body } = require('express-validator');
const db = require('../database/models');
const User = db.User;

module.exports = [

    body('dni')
    .custom((value , {req}) => {
        return User.findOne({
            where: {
                dni : value
            }
        })
        .then(userDNI => {
            if(userDNI && userDNI.id != req.session.user.id){
                return Promise.reject("El DNI ingresado ya se encuentra registrado")
            }
        })
    })
    .withMessage("el DNI ingresado ya se encuentra registrado."),

]