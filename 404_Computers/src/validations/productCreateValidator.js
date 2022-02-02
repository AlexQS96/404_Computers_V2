let { check } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("Debe Ingresar un Nombre.")
    .isLength({ min: 5 })
    .withMessage("Ingrese más de 5 caracteres."),

    check("product_Category")
    .notEmpty()
    .withMessage("Debe elegir una categoría."),

    check('product_Subcategory')
    .notEmpty()
    .withMessage('Debe elegir una subcategoría.'),

    check('price')
    .notEmpty()
    .withMessage('Debe ingresar un precio.')
    .isNumeric()
    .withMessage("Debe ingresar un precio en numeros"),

    check('stock')
    .notEmpty()
    .withMessage('Debe ingresar un stock.')
    .isNumeric()
    .withMessage("Debe ingresar el stock en numeros"),
]