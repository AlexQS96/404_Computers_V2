const express = require('express');
const router = express.Router()
const controller = require('../controllers/homeController.js')
const cookieCheck = require('../middlewares/cookieCheck');

/* Router de Pagina Principal */

router.get('/', cookieCheck, controller.home);

/* Router de Pagina del Local */

router.get('/local', controller.location);

/* Router de Info de Developers */

router.get('/404computers', controller.about);

/* Router de Pagina de Contacto */

router.get('/contacto', controller.contact);

/* Router de Pagina de Terminos y Condiciones */

router.get('/terminos', controller.terms);

/* Router de Pagina de Privacidad */

router.get('/privacidad', controller.privacy);

/* Router de Pagina de Arrepentimiento de Compra */

router.get('/arrepentimiento-compra', controller.purchaseRegret);

/* Router de Pagina de Venta Mayorista */

router.get('/venta-mayorista', controller.resell);

/* Router de Pagina de Venta Mayorista */

router.get('/preguntas-frecuentes', controller.questions);

module.exports = router;