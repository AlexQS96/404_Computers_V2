const { validationResult } = require('express-validator');
let bcrypt = require("bcrypt");
const db = require('../database/models');
const { forEach } = require('../validations/loginValidator');
const User = db.User;
const Product = db.Product;
const History = db.History;
const Cart = db.CartProduct;
const Favorite = db.Favorite;
const Purchase = db.Purchase;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const toDNI = n => n.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.');

module.exports = {
    login: (req, res) => {
        res.render('users/login',{
            pageURL : "productos",
            session: req.session
        });
    },
    editProfile: (req, res) => {

        User.findOne({
            where : {
                id : req.session.user.id
            },
            include: [{ association: "historyProducts" }]
        }).then(user => {
            res.render("users/editProfile", {
                user,
                pageURL : "productos",
                session: req.session,
            });
        });

    },
    updateProfile: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
          let { name, surname, address, phone, dni, province, city } = req.body;
          User.update(
            {
                name,
                surname,
                address,
                image : req.file ? req.file.filename : req.body.image,
                phone,
                dni,
                province,
                city,
            },
            {
              where: {
                id: req.params.id,
              }
            }
          ).then(() => {
            res.redirect(`/perfil/${req.session.user.id}`);
          })
        } else {

            User.findOne({
                where: {
                    id : req.session.user.id
                }
            })
            .then(user =>{
                console.log("ERROR AL ACTUALIZAR PERFIL");
                res.render("users/editProfile", {
                    errors: errors.mapped(),
                    user,
                    pageURL : "productos",
                    old: req.body,
                    session: req.session
                  });
            })
        }

    },
    profile: (req, res) => {
        User.findOne({
            where : {
                id : req.session.user.id
            },
            include: [{ association: "historyProducts"}]
        }).then(users=>{
          
            res.render('users/profile',{
                users,
                toDNI,
                pageURL : "productos",
                session: req.session
            });
        })
        .catch(error => {
            console.log("Tenemos un ERROR: "+error);
        });
    },
    processLogin: (req, res) => {
		
        let errors = validationResult(req);

        if (errors.isEmpty()) {
          User.findOne({
            where: {
              email: req.body.email,
            },
          }).then(user => {
            req.session.user = {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
                image: user.image,
                address: user.address,
                phone: user.phone,
                dni: user.dni
            };
    
            if(req.body.rememberDevice){
                res.cookie("user404", req.session.user, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true,
                });
            }

    
            res.locals.user = req.session.user;
            res.redirect("/")
          });
        }
        else
        {
          res.render('./users/login', {
            errors: errors.mapped(),
            pageURL : "productos",
            session: req.session
          });
        }

	},
    register: (req, res) => {
        res.render('users/register',{
            pageURL : "productos",
            session: req.session
        });
    }
    ,
    processRegister: (req, res) => {
        let errors = validationResult(req)
        
        if(errors.isEmpty()){           

        let { name, surname, email, pass } = req.body

        User.create ({
            name,
            surname,
            email,
            pass:bcrypt.hashSync(pass, 12),
            role : "ROLE_USER",
            image : "user_default.jpg",
            address : "",
            phone: null,
            dni: null,
            province: "",
            city: "",
    
            }).then(()=>{
                res.redirect('/login')
            }).catch(err => console.log ("tenemos un error con el registro en el db "+err))
            
        }
        else
        {
            res.render('users/register', {
                errors: errors.mapped(),
                pageURL : "productos",
                old : req.body,
                session: req.session
            });
        }
    }
    ,
    favorites: (req, res) => {

        User.findOne({
            where : {
                id : req.session.user.id
            },
            include: [{ association: "favorites"}] 
        })
        .then(user => {

            Product.findAll({
                include : ["images","Category","Subcategory"]
            })
            .then(productsData => {
                let result = []
                productsData.forEach(favorited => {
                    for (let i = 0; i < user.favorites.length; i++) {
                        if (user.favorites[i].favorite_Product === favorited.id) {
                            result.push(favorited)
                        }
                    }
                });

                res.render("users/favorites" , {
                    productsData : result,
                    pageURL : "productos",
                    session: req.session,
                    toThousand
                })
            })
        })
        
    }
    ,
    history: (req, res) => {
        User.findOne({
            where : {
                id : req.session.user.id
            },
            include: [{ association: "historyProducts"}]
        })
        .then(user => {

            Product.findAll({
                include : ["images","Category","Subcategory"]
            })
            .then(productsData => {
                
                let result = [];
                
                productsData.forEach(historyData => {
                    for (let i = 0; i < user.historyProducts.length; i++) {
                        if (user.historyProducts[i].product_ID === historyData.id) {
                            result.push(historyData)
                        }
                    }
                });

                res.render("users/history" , {
                    productsData : result,
                    pageURL : "productos",
                    session: req.session,
                    toThousand
                })
            })
        })
    }
    ,
    borrar_perfil: (req, res) => {
        History.destroy({
            where: {
                user_ID: req.params.id
            }
        })
        Cart.destroy({
            where: {
                user_ID: req.params.id
            }
        })
        Favorite.destroy({
            where: {
                user_ID: req.params.id
            }
        })
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=> {
            req.session.destroy()
            if(req.cookies.user404){
                res.cookie('user404', '', {maxAge: -1})
            }

            res.redirect('/');
        })
        .catch(errr => {
            console.log("ERROR AL BORRAR PERFIL : "+errr);
            res.redirect('/editar-perfil');
        })
    }
    ,
    delHistoryProduct: (req, res) => {
        History.destroy({
            where : {
                product_ID : req.params.id,
                user_ID : req.session.user.id
            }
        })
        .then(()=> {
            res.redirect('/historial');
        })
        .catch(errr => {
            console.log("ERROR AL BORRAR PRODUCTO DEL HISTORIAL : "+errr);
            res.redirect('/historial');
        })
    }
    ,
    cart: (req, res) => {

        User.findOne({
            where : {
                id : req.session.user.id
            },
            include: [{ association: "cartProducts"}] 
        })
        .then(user => {

            Product.findAll({
                include : ["images","Category","Subcategory"]
            })
            .then(productsData => {
                let sliderProducts = productsData;
                
                let listOfProducts = [];
                let ListOfQuantity = [];
                productsData.forEach(cart => {
                    for (let i = 0; i < user.cartProducts.length; i++) {
                        if (user.cartProducts[i].cart_Product === cart.id) {
                            listOfProducts.push(cart)
                            ListOfQuantity.push(user.cartProducts[i])
                        }
                    }
                });

                let totalToPay = 0;

                for (let i = 0; i < listOfProducts.length; i++) {
                    totalToPay = totalToPay + listOfProducts[i].finalPrice*ListOfQuantity[i].cart_Quantity 
                }

                ListOfQuantity = ListOfQuantity.reverse();

                /* res.send(productsData[0].CartProducts); */
                res.render("users/cart" , {
                    productsData : listOfProducts,
                    sliderProducts,
                    cartData : ListOfQuantity,
                    totalToPay,
                    cartObj : (user.cartProducts).length,
                    pageURL : "productos",
                    session: req.session,
                    toThousand
                })
            })
        })
        .catch(errr => {
            console.log("ERROR EN PRODUCTOS CARRITO : "+errr);
        })
        
    },
    cart_delete: (req, res) => {
        Cart.destroy({
            where : {
                cart_Product : req.params.id,
                user_ID : req.session.user.id
            }
        })
        .then(()=> {
            res.redirect('/carrito');
        })
        .catch(errr => {
            console.log("ERROR AL BORRAR PRODUCTO DEL CARRITO : "+errr);
            res.redirect('/carrito');
        })
    }
    ,
    cart_plus_stock: (req, res) => {

        let products = Product.findOne({
            where : {
                id : req.params.id
            }
        })

        let foundProduct = Cart.findOne({
            where: {
                cart_Product : req.params.id
            }
        })
        Promise.all([products,foundProduct])
        .then( ([products,foundProduct])=>{

            let number = foundProduct.cart_Quantity

            if (number >= products.stock) {
                number = products.stock
            }
            else
            {
                number = number+1
            }

            Cart.update({
                cart_Quantity : number,
            },
            {
              where: {
                cart_Product: req.params.id,
                user_ID: req.session.user.id
              }
            }
            ).then(() => {
                console.log("Stock Agregado del Carrito Actualizado");
                res.redirect('/carrito');
            })
            .catch(errr => {
                console.log("ERROR AL AUMENTAR STOCK DEL CARRITO : "+errr);
            })
        })
        .catch(errr => {
            console.log("ERROR AL BUSCAR STOCK DEL CARRITO +: "+errr);
        })
    }
    ,
    cart_minus_stock: (req, res) => {

        Cart.findOne({
            where: {
                cart_Product : req.params.id
            }
        })
        .then(foundProduct =>{

            let number = foundProduct.cart_Quantity

            if (number === 1) {
                number = 1
            }
            else
            {
                number = number-1
            }

            Cart.update({
                cart_Quantity : number,
            },
            {
              where: {
                cart_Product: req.params.id,
                user_ID: req.session.user.id
              }
            }
            ).then(() => {
                console.log("Stock Restado del Carrito Actualizado");
                res.redirect('/carrito');
            })
            .catch(errr => {
                console.log("ERROR AL RESTAR STOCK DEL PRODUCTO: "+errr);
            })
        })
        .catch(errr => {
            console.log("ERROR AL BUSCAR STOCK DEL CARRITO -: "+errr);
        })
    }
    ,
    checkout: (req, res) => {
        /* Productos para el Slider */

        let sliderProducts = Product.findAll({
            include : ["images","Category","Subcategory"]
        });

        let user = User.findOne({
            where : {
                id : req.session.user.id
            },
            include: [{ association: "cartProducts"}] 
        })

        let productsData = Product.findAll({
            include : ["Category","Subcategory"]
        })

        Promise.all([sliderProducts,user,productsData])
        .then(([sliderProducts,user,productsData])=> {
            let paySelected = +req.params.pay;
            let payOption = "";

            /* obtengo los datos del carrito del usuario logueado
            y verifico que el carrito no estee vacio, si se encuentra con un producto o mas sigo a la siguiente validacion
            donde verifico que los params de la ruta sean 1, 2 o 3
            de lo contrario los redirijo al carrito en caso de que las validaciones previas no se cumplan
            */
            
            if (!user.cartProducts.length) {
                res.redirect('/carrito');
            }

            if (paySelected < 1 || paySelected > 3) {
                res.redirect('/carrito');
            }
            else
            {
                /* Aca obtengo los productos de la tienda y filtro los que coincidan con el carrito del usuario tambien filtro y ordeno el stock elegido del usuario a obtener de cada producto , esta informacion se usara para mostrar en el recibo del checkout el producto que compro, el precio en base al stock seleccionado y el total de lo que sale toda la compra.
                
                el costo de envio se agregara solo si se marca la opcion en pantalla en base a su codigo postal, una vez confirmada la compra con el boton de confirmar compra se graba en la base de datos los productos junto a un id de orden de compra.
                
                seguido de eso procedo a restar el stock de la base de datos de productos uno por uno segun el stock elegido y luego elimino del carrito de usuario los productos que se compraron */

                /* Obtengo Productos, Cantidad de Stock del Carrito por producto y el total de todo en base a precio final multiplicado por el stock seleccionado */

                let listOfProducts = [];
                let ListOfQuantity = [];

                productsData.forEach(cart => {
                    for (let i = 0; i < user.cartProducts.length; i++) {
                        if (user.cartProducts[i].cart_Product === cart.id) {
                            listOfProducts.push(cart)
                            ListOfQuantity.push(user.cartProducts[i])
                        }
                    }
                });

                let totalToPay = 0;

                for (let i = 0; i < listOfProducts.length; i++) {
                    totalToPay = totalToPay + listOfProducts[i].finalPrice*ListOfQuantity[i].cart_Quantity 
                }

                ListOfQuantity = ListOfQuantity.reverse();
                /* Hasta aca termina lo de productos, stock y precio total */

                /* Aca renderizo el contenido de la vista en base al
                medio de pago que se selecciono */

                if (paySelected === 1) {
                    payOption = 1

                    res.render('users/checkOut',{
                        productsData : listOfProducts,
                        stockData : ListOfQuantity,
                        cartObj : (user.cartProducts).length,
                        totalToPay,
                        sliderProducts,
                        toThousand,
                        payOption,
                        pageURL : "productos",
                        session: req.session
                    });
                }
                else if (paySelected === 2) {
                    payOption = 2;

                    res.render('users/checkOut',{
                        productsData : listOfProducts,
                        stockData : ListOfQuantity,
                        cartObj : (user.cartProducts).length,
                        totalToPay,
                        sliderProducts,
                        toThousand,
                        payOption,
                        pageURL : "productos",
                        session: req.session
                    });
                }
                else if (paySelected === 3) {
                    payOption = 3

                    res.render('users/checkOut',{
                        productsData : listOfProducts,
                        stockData : ListOfQuantity,
                        cartObj : (user.cartProducts).length,
                        totalToPay,
                        sliderProducts,
                        toThousand,
                        payOption,
                        pageURL : "productos",
                        session: req.session
                    });
                }
            }
        })
    }
    ,
    checkout_confirm: (req,res) => {
        let getPaymentOption = +req.params.payopt;
        let getBuyer = +req.session.user.id;
        let createOrderID = Math.floor(Math.random() * 100)+(+req.session.user.id);
        console.log("ORDEN CREADA :"+createOrderID);
        
        Purchase.findAll({
            where: {
                order_ID : createOrderID,
            }
        })
        .then(orderFound => {
            if (orderFound.length>0) {
                createOrderID = Math.floor(Math.random() * 100)+(+req.session.user.id);
                console.log("ORDEN NUEVA CREADA :"+createOrderID);
                console.log("ORDEN ENCONTRADA :"+orderFound.order_ID);
            }
            else
            {
                let getUserCart = User.findOne({
                    where : {
                        id: +req.session.user.id
                    },
                    include: [{ association: "cartProducts"}]
                })
                let getProductsDB = Product.findAll();
                Promise.all([getUserCart,getProductsDB])
                .then(([getUserCart,getProductsDB])=>{

                    let listOfProductsFiltered = [];
                    let ListOfQuantityFiltered = [];
                    let totalToPay = 0;

                    getProductsDB.forEach(product => {
                        for (let i = 0; i < getUserCart.cartProducts.length; i++) {
                            if (getUserCart.cartProducts[i].cart_Product === product.id) {
                                listOfProductsFiltered.push(product)
                                ListOfQuantityFiltered.push(getUserCart.cartProducts[i])
                            }
                        }
                    });

                    for (let i = 0; i < listOfProductsFiltered.length; i++) {
                        totalToPay = totalToPay + listOfProductsFiltered[i].finalPrice*ListOfQuantityFiltered[i].cart_Quantity 
                    }
    
                    let {cpCode,nameCard,cardNumber,yearCard,monthCard,ccvCard,homeAddress} = req.body;

                    
                    for (let i = 0; i < listOfProductsFiltered.length; i++) {
                        /* Actualizo la base de datos de Compra(Purchase) agregando cada producto */

                        /* si es opcion 2 tomo los datos de tarjeta y envio - si es por mercadopago solo los de envio */

                        if (getPaymentOption === 2) {
                            Purchase.create({
                                buyer_ID: getBuyer,
                                item_Name: listOfProductsFiltered[i].name,
                                item_ID: listOfProductsFiltered[i].id,
                                item_Price: listOfProductsFiltered[i].finalPrice * ListOfQuantityFiltered[i].cart_Quantity,
                                item_Quantity: ListOfQuantityFiltered[i].cart_Quantity,
                                order_ID: createOrderID,
                                payment_Option: getPaymentOption,
                                homeAddress: homeAddress,
                                cpCode: String(cpCode),
                                nameCard: nameCard,
                                cardNumber: String(cardNumber),
                                monthCard: monthCard,
                                yearCard: String(yearCard),
                                cvvCard: ccvCard,
                            })
                            .then()
                            .catch(errr => {
                                console.log("ERROR EN PURCHASE: "+errr);
                            })
                        }
                        else
                        {
                            Purchase.create({
                                buyer_ID: getBuyer,
                                item_Name: listOfProductsFiltered[i].name,
                                item_ID: listOfProductsFiltered[i].id,
                                item_Price: listOfProductsFiltered[i].finalPrice * ListOfQuantityFiltered[i].cart_Quantity,
                                item_Quantity: ListOfQuantityFiltered[i].cart_Quantity,
                                order_ID: createOrderID,
                                payment_Option: getPaymentOption,
                                homeAddress: homeAddress,
                                cpCode: String(cpCode),
                                nameCard: "",
                                cardNumber: "",
                                monthCard : 0,
                                yearCard: 0,
                                cvvCard: 0,
                            })
                            .then()
                            .catch(errr => {
                                console.log("ERROR EN PURCHASE: "+errr);
                            })
                        }

                        /* Actualizo la base de datos de Carrito eliminando lo que se compro */

                        Cart.destroy({
                            where: {
                                user_ID : getBuyer,
                            }
                        })
                        .then()
                        .catch(errr => {
                            console.log("ERROR EN DESTROY CARRITO: "+errr);
                        })

                        /* Actualizo la base de datos de Productos restando el stock de lo que se compro */

                        Product.update({
                            stock : listOfProductsFiltered[i].stock - ListOfQuantityFiltered[i].cart_Quantity,
                        },
                        {
                          where: {
                            id: listOfProductsFiltered[i].id,
                          }
                        })
                        .then()
                        .catch(errr => {
                            console.log("ERROR EN RESTAR STOCK PRODUCTOS: "+errr);
                        })
                        
                    }

                })
                res.redirect(`/mis-compras/${createOrderID}`);
            }
        })

    }
    ,
    purchases: (req, res) => {
        Purchase.findAll({
            where : {
                buyer_ID: +req.session.user.id 
            }
        })
        .then(userPurchases => {

                console.log("CANT DE ORDENES : "+userPurchases.length);

                let ordenes = 0;

                for (let i = 0; i < userPurchases.length; i++) {
                    if (i > 0) {
                        if (userPurchases[i].order_ID === userPurchases[i-1].order_ID) {
                            ordenes = ordenes+1
                            console.log("ESTA ORDEN ESTA REPETIDA :"+userPurchases[i].order_ID);
                        }
                    }
                }

                ordenes = userPurchases.length-ordenes

                console.log("CANT DE ORDENES FILTRADAS : "+ordenes);

                res.render('users/purchases',{
                    userPurchases,
                    pageURL : "productos",
                    session: req.session
                });
        })
        .catch(errr => {
            console.log("ERROR AL CARGAR DB PURCHASES: "+errr+" USER : "+req.session.user.id);
        })
        
    }
    ,
    purchase_detail: (req, res) => {
        Purchase.findAll({
            where: {
                order_ID : req.params.order,
                buyer_ID : req.session.user.id
            }
        })
        .then(details =>{
            let payment = "";
            let totalPurchased = 0;

            if (details[0].payment_Option === 1) {
                payment = "Efectivo"
            }
            else if (details[0].payment_Option === 2) {
                payment = "Tarjeta"
            }
            else if (details[0].payment_Option === 3) {
                payment = "MercadoPago"
            }
            
            for (let i = 0; i < details.length; i++) {
                totalPurchased = totalPurchased + details[i].item_Price
            }

            res.render('users/purchaseDetail',{
                details,
                payment,
                totalPurchased,
                toThousand,
                pageURL : "productos",
                session: req.session
            });
        })
    }
    ,
    favorite_delete_user: (req, res) => {
        Favorite.destroy({
            where : {
                favorite_Product : req.params.id,
                user_ID : req.session.user.id
            }
        })
        .then(()=> {
            res.redirect('/favoritos');
        })
        .catch(errr => {
            console.log("ERROR AL BORRAR PRODUCTO DE Favoritos : "+errr);
            res.redirect('/favoritos');
        })
    }
    ,
    logout: (req, res) => {
        req.session.destroy()
        if(req.cookies.user404){
            res.cookie('user404', '', {maxAge: -1})
        }
        res.redirect('/')
    }
}