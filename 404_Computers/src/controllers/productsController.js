const db = require('../database/models');
const User = db.User; 
const Product = db.Product; 
const Category = db.Category;
const Subcategory = db.Subcategory;
const History = db.History;
const Cart = db.CartProduct;
const Favorite = db.Favorite;
const { Op } = require('sequelize');
const sequelize = require('sequelize');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    product_Detail: (req, res) => {

        let sliderProducts = Product.findAll({
            include :  ["images","Category","Subcategory"]
        })

        let product = Product.findOne({
                where : {
                    id : req.params.id
                },
                include : ["images","Category","Subcategory"]
            }
        )

        let favoriteItem = req.session.user? Favorite.findOne({
            where : {
                favorite_Product : req.params.id,
                user_ID : req.session.user.id
            }
        }) : []

        Promise.all([sliderProducts , product , favoriteItem])
        .then(([sliderProducts , product , favoriteItem]) => {
            if(req.params.category === product.Category.category_Link && req.params.subcategory === product.Subcategory.subcategory_Link)
            {
                if(req.session.user)
                {
                    User.findOne({
                        where : {
                            id : req.session.user.id
                        },
                        include: ["favorites","historyProducts"] 
                    })
                    .then(user => {
                        
                        History.findOne({
                            where : {
                                product_ID : req.params.id,
                                user_ID : user.id
                            }
                        })
                        .then(productFound => {
                            if(!productFound)
                            {
                                History.create(
                                    {
                                        user_ID : user.id,
                                        product_ID : product.id
                                    },
                                    {
                                        where: {
                                            id: user.id,
                                        }
                                    }
                                )
                            }
                        })
                        res.render('products/productDetail' , {
                            product,
                            sliderProducts,
                            pageURL : "http://"+req.headers.host+"/productos",
                            favoriteItem,
                            session: req.session,
                            toThousand
                        })
                    })
                }
                else
                {
                    res.render('products/productDetail' , {
                        product,
                        sliderProducts,
                        favoriteItem : -1,
                        pageURL : "http://"+req.headers.host+"/productos",
                        session: req.session,
                        toThousand
                    })
                }
            }
            else
            {
                res.render('errorPage' , {
                    error: "El Producto al cual intenta acceder no existe o fue removido de la pagina.",
                    session: req.session
                })
            }
        })
        .catch(error => {
            console.log("Tenemos un ERROR al mostrar Producto: "+error);
        });
    }
    ,
    productsList: (req, res) => {

        let productNotFound = 0;
        let order = "ASC";
        let orderURL = "";

        let offers;
        let offersURL = "";

        if (req.query.offers != undefined) {
            offers = 1;
            offersURL = "&offers=1"
        }
        else
        {
            offers = 0;
        }

        if (req.query.order != undefined) {
            if(!+req.query.order) {
                orderURL = "&order=0";
            }
            else
            {
                order = "DESC";
                orderURL = "&order=1";
            }
        }
        else
        {
            orderURL = "";
        }
        
        let pageActive;

        if (req.query.page != undefined) {
            pageActive = +req.query.page-1;
        }
        else
        {
            pageActive = 0;
        }

        let quantityProducts = 8;
        let pagesCount = Product.findAll()
        
        let searchQuery = "";

        let searchWord = "";

        const categories = Category.findAll()
        let products = Product.findAll({
            include : ["images","Category","Subcategory"],
            offset : 0,
            limit : quantityProducts,
            order: [
                ["finalPrice", order]
            ]
        })

        if (+req.query.page>1) {
            products = Product.findAll({
                include : ["images","Category","Subcategory"],
                offset : quantityProducts*(+req.query.page-1),
                limit : quantityProducts,
                order: [
                    ["finalPrice", order]
                ]
            })
        }

        if(req.query.search != undefined)
        {
            searchQuery = "&search="+req.query.search;
            searchWord = req.query.search.toLowerCase();
            
            products = Product.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                },
                include : ["images","Category","Subcategory"],
                offset : 0,
                limit : quantityProducts,
                order: [
                    ["finalPrice", order]
                ]
            })

            pagesCount = Product.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                },
                include : ["images","Category","Subcategory"],
                order: [
                    ["finalPrice", order]
                ]
            });

            if (+req.query.page>0){
                products = Product.findAll({
                    where: {
                        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                    },
                    include : ["images","Category","Subcategory"],
                    offset : quantityProducts*(+req.query.page-1),
                    limit : quantityProducts,
                    order: [
                        ["finalPrice", order]
                    ]
                })
            }
        }

        if(offers)
        {   
            products = Product.findAll({
                where : {
                    discount : {
                        [Op.gt]: 0, 
                    }
                },
                include : ["images","Category","Subcategory"],
                offset : 0,
                limit : quantityProducts,
                order: [
                    ["finalPrice", order]
                ]
            })

            pagesCount = Product.findAll({
                where : {
                    discount : {
                        [Op.gt]: 0, 
                    }
                },
                include : ["images","Category","Subcategory"],
                order: [
                    ["finalPrice", order]
                ]
            });

            if (+req.query.page>0){
                products = Product.findAll({
                    where : {
                        discount : {
                            [Op.gt]: 0, 
                        }
                    },
                    include : ["images","Category","Subcategory"],
                    offset : quantityProducts*(+req.query.page-1),
                    limit : quantityProducts,
                    order: [
                        ["finalPrice", order]
                    ]
                })
            }

            /* Busqueda con Ofertas */

            if(req.query.search != undefined)
            {
                searchQuery = "&search="+req.query.search;
                searchWord = req.query.search.toLowerCase();
                
                products = Product.findAll({
                    where: {
                        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%'),
                        discount : {
                            [Op.gt]: 0, 
                        }
                    },
                    include : ["images","Category","Subcategory"],
                    offset : 0,
                    limit : quantityProducts,
                    order: [
                        ["finalPrice", order]
                    ]
                })

                pagesCount = Product.findAll({
                    where: {
                        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%'),
                        discount : {
                            [Op.gt]: 0, 
                        }
                    },
                    include : ["images","Category","Subcategory"],
                    order: [
                        ["finalPrice", order]
                    ]
                });

                if (+req.query.page>0){
                    products = Product.findAll({
                        where: {
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%'),
                            discount : {
                                [Op.gt]: 0, 
                            }
                        },
                        include : ["images","Category","Subcategory"],
                        offset : quantityProducts*(+req.query.page-1),
                        limit : quantityProducts,
                        order: [
                            ["finalPrice", order]
                        ]
                    })
                }
            }

        }

        Promise.all([products,categories,pagesCount,quantityProducts])
        .then(([products,categories,pagesCount,quantityProducts]) =>{

            if (pagesCount.length < 9) {
                pageActive = -1
            }

            if (!products.length) {
                productNotFound = "Lo sentimos "+req.query.search+" no se encuentra disponible en la tienda."
            }

            console.log("Paginas Disponibles : "+pagesCount.length/(quantityProducts+1));

            if (+req.query.page <= 0 || +req.query.page > Math.round(pagesCount.length/quantityProducts)) {
                res.render('errorPage' , {
                    error: "La Pagina a la cual intenta acceder no existe",
                    pageURL : req.url,
                    session: req.session
                })
            }
            else
            {
                res.render('products/productsList' , {
                    products,
                    categories,
                    quantityProducts,
                    pagesCount : pagesCount.length,
                    pageActive,
                    searchQuery,
                    orderURL,
                    productNotFound,
                    offersURL,
                    pageURL : req.url,
                    subCategoriesFiltered : 0,
                    title : 'Productos - ',
                    session: req.session,
                    toThousand
                });
            }
        })
        .catch(error => {
            console.log("Tenemos un ERROR: "+error);
        });

    }
    ,
    categories: (req, res) => {

        let productNotFound = 0;
        let order = "ASC";
        let orderURL = "";

        let offers;
        let offersURL = "";

        if (req.query.offers != undefined) {
            offers = 1;
            offersURL = "&offers=1"
        }
        else
        {
            offers = 0;
        }
        
        if (req.query.order != undefined) {
            if(!+req.query.order) {
                orderURL = "&order=0";
            }
            else
            {
                order = "DESC";
                orderURL = "&order=1";
            }
        }
        else
        {
            orderURL = "";
        }

        let pageActive;

        if (req.query.page != undefined) {
            pageActive = +req.query.page-1;
        }
        else
        {
            pageActive = 0;
        }

        let quantityProducts = 3;

        Category.findOne({
            where : {
                category_Link : req.params.category,
            }
        })
        .then(categoryPage => {

            let categories = Category.findAll()

            let pagesCount = Product.findAll({
                where: {
                    product_Category : categoryPage.id,
                }
            })

            let searchQuery = "";

            let searchWord = "";

            let products = Product.findAll({
                include :  ["images","Category","Subcategory"],
                where : {
                    product_Category : categoryPage.id,
                },
                offset : 0,
                limit : quantityProducts,
                order: [
                    ["finalPrice", order]
                ]
            })

            if (+req.query.page>1) {
                products = Product.findAll({
                    include :  ["images","Category","Subcategory"],
                    where : {
                        product_Category : categoryPage.id,
                    },
                    offset : quantityProducts*(+req.query.page-1),
                    limit : quantityProducts,
                    order: [
                        ["finalPrice", order]
                    ]
                })
            }

            if(req.query.search != undefined)
            {
                searchQuery = "&search="+req.query.search;
                searchWord = req.query.search.toLowerCase();
                
                products = Product.findAll({
                    where: {
                        product_Category : categoryPage.id,
                        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                    },
                    include : ["images","Category","Subcategory"],
                    offset : 0,
                    limit : quantityProducts,
                    order: [
                        ["finalPrice", order]
                    ]
                })

                pagesCount = Product.findAll({
                    where: {
                        product_Category : categoryPage.id,
                        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                    },
                    include : ["images","Category","Subcategory"],
                    order: [
                        ["finalPrice", order]
                    ]
                });

                if (+req.query.page>0){
                    products = Product.findAll({
                        where: {
                            product_Category : categoryPage.id,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                        },
                        include : ["images","Category","Subcategory"],
                        offset : quantityProducts*(+req.query.page-1),
                        limit : quantityProducts,
                        order: [
                            ["finalPrice", order]
                        ]
                    })
                }
            }

            if(offers)
            {   
                products = Product.findAll({
                    where : {
                        product_Category : categoryPage.id,
                        discount : {
                            [Op.gt]: 0, 
                        }
                    },
                    include : ["images","Category","Subcategory"],
                    offset : 0,
                    limit : quantityProducts,
                    order: [
                        ["finalPrice", order]
                    ]
                })

                pagesCount = Product.findAll({
                    where : {
                        product_Category : categoryPage.id,
                        discount : {
                            [Op.gt]: 0, 
                        }
                    },
                    include : ["images","Category","Subcategory"],
                    order: [
                        ["finalPrice", order]
                    ]
                });

                if (+req.query.page>0){
                    products = Product.findAll({
                        where : {
                            product_Category : categoryPage.id,
                            discount : {
                                [Op.gt]: 0, 
                            }
                        },
                        include : ["images","Category","Subcategory"],
                        offset : quantityProducts*(+req.query.page-1),
                        limit : quantityProducts,
                        order: [
                            ["finalPrice", order]
                        ]
                    })
                }

                /* Busqueda con Ofertas */

                if(req.query.search != undefined)
                {
                    searchQuery = "&search="+req.query.search;
                    searchWord = req.query.search.toLowerCase();
                    
                    products = Product.findAll({
                        where: {
                            product_Category : categoryPage.id,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%'),
                            discount : {
                                [Op.gt]: 0, 
                            }
                        },
                        include : ["images","Category","Subcategory"],
                        offset : 0,
                        limit : quantityProducts,
                        order: [
                            ["finalPrice", order]
                        ]
                    })

                    pagesCount = Product.findAll({
                        where: {
                            product_Category : categoryPage.id,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%'),
                            discount : {
                                [Op.gt]: 0, 
                            }
                        },
                        include : ["images","Category","Subcategory"],
                        order: [
                            ["finalPrice", order]
                        ]
                    });

                    if (+req.query.page>0){
                        products = Product.findAll({
                            where: {
                                product_Category : categoryPage.id,
                                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%'),
                                discount : {
                                    [Op.gt]: 0, 
                                }
                            },
                            include : ["images","Category","Subcategory"],
                            offset : quantityProducts*(+req.query.page-1),
                            limit : quantityProducts,
                            order: [
                                ["finalPrice", order]
                            ]
                        })
                    }
                }

            }

            let subcategories = Subcategory.findAll({
                where : {
                    category_Id : categoryPage.id
                }
            })

            Promise.all([categoryPage,categories, products,subcategories,pagesCount,quantityProducts])
            .then(([categoryPage,categories, products,subcategories,pagesCount,quantityProducts]) => {
                
                if (pagesCount.length < 3) {
                    pageActive = -1
                }

                if (!products.length) {
                    productNotFound = "Lo sentimos "+req.query.search+" no se encuentra disponible en esta Categoria - Tienda."
                }

                console.log("Pagina Activa : "+pageActive);

                if (+req.query.page <= 0 || +req.query.page > Math.round(pagesCount.length/quantityProducts)+1) {
                    res.render('errorPage' , {
                        error: "La Pagina a la cual intenta acceder no existe",
                        pageURL : req.url,
                        session: req.session
                    })
                }
                else
                {

                    res.render('products/productsList', {
                        products,
                        categories,
                        pagesCount : pagesCount.length+1,
                        pageActive,
                        orderURL,
                        offersURL,
                        searchQuery,
                        productNotFound,
                        pageURL : req.url,
                        quantityProducts,
                        title : categoryPage.category_Name+" - ",
                        linkOfCategory : req.params.category,
                        subCategoriesFiltered : 1,
                        subcategories,
                        session: req.session,
                        toThousand
                    });
                }
            })
            .catch(error => {
                console.log("Tenemos un ERROR: "+error);
            });
                
        })
        .catch(() => {
            res.render('errorPage' , {
                error: "La Categoria a la cual intenta acceder no existe o fue removida de la pagina.",
                pageURL : "http://"+req.headers.host+"/productos",
                session: req.session
            });
        });
    }
    ,
    subCategories: (req, res) => {

        let productNotFound = 0;
        let order = "ASC";
        let orderURL = "";

        let offers;
        let offersURL = "";

        if (req.query.offers != undefined) {
            offers = 1;
            offersURL = "&offers=1"
        }
        else
        {
            offers = 0;
        }
        
        if (req.query.order != undefined) {
            if(!+req.query.order) {
                orderURL = "&order=0";
            }
            else
            {
                order = "DESC";
                orderURL = "&order=1";
            }
        }
        else
        {
            orderURL = "";
        }

        let pageActive;

        if (req.query.page != undefined) {
            pageActive = +req.query.page-1;
        }
        else
        {
            pageActive = 0;
        }

        let quantityProducts = 3;

        Subcategory.findOne({
            where : {
                subcategory_Link : req.params.subcategory
            }
        })
        .then(subcategoryPage => {

            let categories = Category.findAll()

            let pagesCount = Product.findAll({
                where : {
                    product_Subcategory : subcategoryPage.id
                }
            })

            let searchQuery = "";

            let searchWord = "";

            let products = Product.findAll({
                include :  ["images","Category","Subcategory"],
                where : {
                    product_Subcategory : subcategoryPage.id
                },
                offset : 0,
                limit : quantityProducts,
                order: [
                    ["finalPrice", order]
                ]
            })

            if (+req.query.page>1) {
                products = Product.findAll({
                    include :  ["images","Category","Subcategory"],
                    where : {
                        product_Subcategory : subcategoryPage.id
                    },
                    offset : quantityProducts*(+req.query.page-1),
                    limit : quantityProducts,
                    order: [
                        ["finalPrice", order]
                    ]
                })
            }

            if(req.query.search != undefined)
            {
                searchQuery = "&search="+req.query.search;
                searchWord = req.query.search.toLowerCase();
                
                products = Product.findAll({
                    where: {
                        product_Subcategory : subcategoryPage.id,
                        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                    },
                    include : ["images","Category","Subcategory"],
                    offset : 0,
                    limit : quantityProducts,
                    order: [
                        ["finalPrice", order]
                    ]
                })

                pagesCount = Product.findAll({
                    where: {
                        product_Subcategory : subcategoryPage.id,
                        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                    },
                    include : ["images","Category","Subcategory"],
                    order: [
                        ["finalPrice", order]
                    ]
                });

                if (+req.query.page>0){
                    products = Product.findAll({
                        where: {
                            product_Subcategory : subcategoryPage.id,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                        },
                        include : ["images","Category","Subcategory"],
                        offset : quantityProducts*(+req.query.page-1),
                        limit : quantityProducts,
                        order: [
                            ["finalPrice", order]
                        ]
                    })
                }
            }

            if(offers)
            {   
                products = Product.findAll({
                    where : {
                        product_Subcategory : subcategoryPage.id,
                        discount : {
                            [Op.gt]: 0, 
                        }
                    },
                    include : ["images","Category","Subcategory"],
                    offset : 0,
                    limit : quantityProducts,
                    order: [
                        ["finalPrice", order]
                    ]
                })

                pagesCount = Product.findAll({
                    where : {
                        product_Subcategory : subcategoryPage.id,
                        discount : {
                            [Op.gt]: 0, 
                        }
                    },
                    include : ["images","Category","Subcategory"],
                    order: [
                        ["finalPrice", order]
                    ]
                });

                if (+req.query.page>0){
                    products = Product.findAll({
                        where : {
                            product_Subcategory : subcategoryPage.id,
                            discount : {
                                [Op.gt]: 0, 
                            }
                        },
                        include : ["images","Category","Subcategory"],
                        offset : quantityProducts*(+req.query.page-1),
                        limit : quantityProducts,
                        order: [
                            ["finalPrice", order]
                        ]
                    })
                }

                /* Busqueda con Ofertas */

                if(req.query.search != undefined)
                {
                    searchQuery = "&search="+req.query.search;
                    searchWord = req.query.search.toLowerCase();
                    
                    products = Product.findAll({
                        where: {
                            product_Subcategory : subcategoryPage.id,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%'),
                            discount : {
                                [Op.gt]: 0, 
                            }
                        },
                        include : ["images","Category","Subcategory"],
                        offset : 0,
                        limit : quantityProducts,
                        order: [
                            ["finalPrice", order]
                        ]
                    })

                    pagesCount = Product.findAll({
                        where: {
                            product_Subcategory : subcategoryPage.id,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%'),
                            discount : {
                                [Op.gt]: 0, 
                            }
                        },
                        include : ["images","Category","Subcategory"],
                        order: [
                            ["finalPrice", order]
                        ]
                    });

                    if (+req.query.page>0){
                        products = Product.findAll({
                            where: {
                                product_Subcategory : subcategoryPage.id,
                                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%'),
                                discount : {
                                    [Op.gt]: 0, 
                                }
                            },
                            include : ["images","Category","Subcategory"],
                            offset : quantityProducts*(+req.query.page-1),
                            limit : quantityProducts,
                            order: [
                                ["finalPrice", order]
                            ]
                        })
                    }
                }

            }

            let subcategories = Subcategory.findAll({
                where : {
                    category_Id : subcategoryPage.category_Id
                }
            })

            Promise.all([subcategoryPage,categories, products,subcategories,pagesCount,quantityProducts])
            .then(([subcategoryPage,categories, products,subcategories,pagesCount,quantityProducts]) => {
                
                if (pagesCount.length < 3) {
                    pageActive = -1
                }

                if (!products.length) {
                    productNotFound = "Lo sentimos "+req.query.search+" no se encuentra disponible en esta Sub Categoria - Tienda."
                }

                console.log("Pagina Activa : "+pageActive);

                if (+req.query.page <= 0 || +req.query.page > Math.round(pagesCount.length/quantityProducts)+1) {
                    res.render('errorPage' , {
                        error: "La Pagina a la cual intenta acceder no existe",
                        pageURL : req.url,
                        session: req.session
                    })
                }
                else
                {
                    res.render('products/productsList', {
                        products,
                        categories,
                        pagesCount : pagesCount.length+1,
                        pageActive,
                        orderURL,
                        offersURL,
                        searchQuery,
                        productNotFound,
                        pageURL : req.url,
                        quantityProducts,
                        title : subcategoryPage.subcategory_Name+" - ",
                        linkOfCategory : req.params.category,
                        subCategoriesFiltered : 1,
                        subcategories,
                        session: req.session,
                        toThousand
                    });
                }
            })
            .catch(error => {
                console.log("Tenemos un ERROR: "+error);
            });

        })
        .catch(error => {
            res.render('errorPage' , {
                error: "La Sub Categoria a la cual intenta acceder no existe o fue removida de la pagina.",
                pageURL : "http://"+req.headers.host+"/productos",
                session: req.session
            });
        });

    }
    ,
    cart_add: (req, res) => {

        Cart.findOne({
            where : {
                user_ID : req.session.user.id,
                cart_Product : req.params.id
            }
        })
        .then(productFound => {
            if(!productFound)
            {
                Cart.create(
                    {
                        user_ID : req.session.user.id,
                        cart_Product : req.params.id,
                        cart_Quantity : 1
                    }
                )
                .then(()=> {
                    res.redirect("/carrito");
                })
                .catch(errr => {
                    console.log("ERROR Al Agregar a Carrito Nuevo Producto");
                })
            }
            else
            {
                res.redirect("/carrito");
            }
        })
        .catch(errr => {
            console.log("ERROR Al Buscar en el Carrito");
        })
    }
    ,
    favorite_add: (req, res) => {

        Favorite.findOne({
            where : {
                user_ID : req.session.user.id,
                favorite_Product : req.params.id
            }
        })
        .then(productFound => {
            if(!productFound)
            {
                Favorite.create(
                    {
                        user_ID : req.session.user.id,
                        favorite_Product : req.params.id
                    }
                )
                .then(()=> {
                    res.redirect("/favoritos");
                })
                .catch(errr => {
                    console.log("ERROR Al Agregar a Favoritos");
                })
            }
            else
            {
                res.redirect("/favoritos");
            }
        })
        .catch(errr => {
            console.log("ERROR Al Buscar en Favoritos");
        })
    }
    ,
    favorite_delete: (req, res) => {
        Favorite.destroy({
            where : {
                favorite_Product : req.params.id,
                user_ID : req.session.user.id
            }
        })
        .then(()=> {
            res.redirect("/favoritos");
        })
        .catch(errr => {
            console.log("ERROR AL BORRAR PRODUCTO DE Favoritos : "+errr);
            res.redirect("/favoritos");
        })
    }
}