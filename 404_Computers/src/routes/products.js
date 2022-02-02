const express = require('express');
const router = express.Router()
const controller = require('../controllers/productsController.js')

/* Router de todos los Productos Disponibles */

router.get('/productos', controller.productsList);

/* Router de todos los Productos disponibles segun la Categoria */

router.get('/productos/:category', controller.categories);

/* Router de todos los Productos disponibles segun la Categoria y Sub-Categoria */

router.get('/productos/:category/:subcategory', controller.subCategories);

/* Router del detalle de Producto */

router.get('/productos/:category/:subcategory/:id', controller.product_Detail);

/* Router de Agregar Producto a Carrito */

router.post('/agregar-carrito/:id', controller.cart_add);

/* Router de Agregar Producto a Favoritos */

router.post('/agregar-favorito/:id', controller.favorite_add);

router.delete('/borrar-favorito/:id', controller.favorite_delete);

module.exports = router;