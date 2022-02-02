const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
const userLog = require('../middlewares/userLog');
const profileCheck = require('../middlewares/profileCheck');
const userEditCheck = require('../validations/profileEditValidator');
const uploadProfilePicFile = require("../middlewares/uploadProfilePicFile");

/* Router de Login y Logout */
router.get('/login', userLog, controller.login);
router.post('/login', loginValidator, controller.processLogin);
router.get('/logout', userSessionCheck, controller.logout);

/* Router de Registro */

router.get('/registro', userLog, controller.register);
router.post('/registro', registerValidator, controller.processRegister);

/* Routers de Favoritos */

router.get('/favoritos', userSessionCheck, controller.favorites);

router.get('/mis-compras', userSessionCheck, controller.purchases);

router.get('/mis-compras/:order', userSessionCheck, controller.purchase_detail);

router.delete('/borrar-favorito-user/:id', controller.favorite_delete_user);

/* Routers de Historial */

router.get('/historial', userSessionCheck, controller.history);

router.delete('/delHistoryProduct/:id', controller.delHistoryProduct);

/* Routers de Edicion de Perfil */

router.get('/editar-perfil', userSessionCheck, controller.editProfile);

router.put('/updateprofile/:id' ,uploadProfilePicFile.single("image"),userEditCheck, controller.updateProfile)

/* Routers de Perfil de Usuario */
router.get('/perfil/:id', userSessionCheck,profileCheck ,controller.profile);/* cambie la ruta para que en perfil nos muestre los datos del usuario que venga por id */

/* Routers de Carrito de Compras */

router.get('/carrito', userSessionCheck, controller.cart);

router.get('/checkout/:pay', userSessionCheck, controller.checkout);

/* Routers de Stock Carrito */

router.put('/updateCartMinus/:id', controller.cart_minus_stock);
router.put('/updateCartPlus/:id', controller.cart_plus_stock);

router.post('/confirmPurchase/:payopt', userSessionCheck, controller.checkout_confirm);


router.delete('/cart_delete/:id', controller.cart_delete);

/* Boton de Eliminar Perfil */
router.delete('/borrarPerfil/:id', controller.borrar_perfil);

module.exports = router;