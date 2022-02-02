const { check, body } = require('express-validator')
const bcrypt = require("bcrypt");
const db = require('../database/models');
const User = db.User;

module.exports = [

    body("email").custom((value, { req }) => {
        return User.findOne({
            where: {
                email: req.body.email
            },
        })
        .then(user => {
            if (user.length<1) {
                return Promise.reject();
            }

            if (!bcrypt.compareSync(req.body.pass, user.dataValues.pass)) {
                return Promise.reject();
            }
        })
        .catch((error) => {
            return Promise.reject();
        });
    })
    .withMessage("ERROR: Credenciales no Validas."),

]