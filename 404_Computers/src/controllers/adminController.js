const { validationResult } = require('express-validator');
const db = require('../database/models');
const {eliminarImagen, eliminarBanner} = require("../database/config/product_config")
const User = db.User;
const History = db.History;
const Cart = db.CartProduct;
const Favorite = db.Favorite;
const Product = db.Product;
const Category = db.Category;
const Subcategory = db.Subcategory;
const Banner = db.Banner;
const Product_Images = db.ProductImage;
const { Op } = require('sequelize');
const sequelize = require('sequelize');

module.exports = {
    admin_usuarios: (req, res) => {

        let pageActive;
        let searchQuery = "";
        if (req.query.page != undefined) {
            pageActive = +req.query.page-1;
        }
        else
        {
            pageActive = 0;
        }

        let quantityUsers = 8;
        let pagesCount = User.findAll()

        let users = User.findAll({
            offset : 0,
            limit : quantityUsers,
        })

        if (+req.query.page>1) {
            users = User.findAll({
                offset : quantityUsers*(+req.query.page-1),
                limit : quantityUsers,
            })
        }

        if(req.query.busqueda != undefined)
        {
            searchQuery = "&busqueda="+req.query.busqueda;
            searchWord = req.query.busqueda.toLowerCase();
            
            users = User.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                },
                offset : 0,
                limit : quantityUsers,
            })

            pagesCount = User.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                },
            });

            if (+req.query.page>0){
                users = User.findAll({
                    where: {
                        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                    },
                    offset : quantityUsers*(+req.query.page-1),
                    limit : quantityUsers,
                })
            }
        }

        Promise.all([users,pagesCount,quantityUsers])
        .then(([users,pagesCount,quantityUsers]) => {

            let lastPage = Math.round(pagesCount.length/quantityUsers);
            let firstPage = lastPage - lastPage+1;
            let pageLinkFirst = "?page="+firstPage;
            let pageLinkLast = "?page="+lastPage;

            if (lastPage === 0) {
                pageLinkFirst = ""
                pageLinkLast = ""
            }
            
            console.log("LAST PAGE "+lastPage);
            console.log("FIRST PAGE "+firstPage);

            if (+req.query.page < 1) {
                res.redirect(`/admin/usuarios${pageLinkFirst}${searchQuery}`)
            }
            else if(+req.query.page > Math.round(pagesCount.length/quantityUsers))
            {
                res.redirect(`/admin/usuarios${pageLinkLast}${searchQuery}`)
            }
            else
            {
                if (pagesCount.length < 9) {
                    pageActive = -1
                }

                res.render('admin/adminUsersList',  {
                    usersData : users,
                    pagesCount : pagesCount.length,
                    pageActive,
                    searchQuery,
                    quantityUsers,
                    session: req.session
                });
            }
        })
        .catch((err) => console.log("ERROR en Admin_Usuarios: "+err));
    }
    ,
    admin_detalle_usuario: (req, res) => {
        User.findOne({
            where : {
                id : req.params.id
            }
        })
        .then(user => {
            res.render('admin/adminEditUser',  {
                user,
                session: req.session
            });
        })
        .catch((err) => console.log("ERROR en Detalle Usuario: "+err));
    }
    ,
    admin_detalle_usuario_editar: (req, res) => {

        let { name, surname, address, dni, role ,email, phone, image } = req.body;

        User.update({
            name,
            surname,
            address,
            dni,
            role,
            email,
            phone,
            image
        },
        {
            where : {
                id : req.params.id
            }
        })
        .then(() => {
            res.redirect('/admin/usuarios')
        })
        .catch((err) => console.log("ERROR Editando Usuario: "+err));
    }
    ,
    admin_productos: (req, res) => {

        let pageActive;
        let searchQuery = "";
        let stockLink = "";
        let noStockLink = "";
        let offersLink = "";

        if (req.query.page != undefined) {
            pageActive = +req.query.page-1;
        }
        else
        {
            pageActive = 0;
        }

        let quantityProducts = 8;
        let pagesCount = Product.findAll()

        let products = Product.findAll({
            include : ["Category","Subcategory"],
            offset : 0,
            limit : quantityProducts,
        })

        if (+req.query.page>1) {
            products = Product.findAll({
                include : ["Category","Subcategory"],
                offset : quantityProducts*(+req.query.page-1),
                limit : quantityProducts,
            })
        }

        if(req.query.busqueda != undefined)
        {
            searchQuery = "&busqueda="+req.query.busqueda;
            searchWord = req.query.busqueda.toLowerCase();
            
            products = Product.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                },
                include : ["Category","Subcategory"],
                offset : 0,
                limit : quantityProducts,
            })

            pagesCount = Product.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                },
                include : ["Category","Subcategory"],
            });

            if (+req.query.page>0){
                products = Product.findAll({
                    where: {
                        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchWord + '%')
                    },
                    include : ["Category","Subcategory"],
                    offset : quantityProducts*(+req.query.page-1),
                    limit : quantityProducts,
                })
            }
        }

        if (req.query.stock) {

            stockLink = "&stock=1"

            products = Product.findAll({
                where : {
                    stock : {
                        [Op.gt]: 0, 
                    }
                },
                include : ["Category","Subcategory"],
                offset : 0,
                limit : quantityProducts,
            })

            pagesCount = Product.findAll({
                where : {
                    stock : {
                        [Op.gt]: 0, 
                    }
                },
                include : ["Category","Subcategory"],
            });

            if (+req.query.page>0){
                products = Product.findAll({
                    where : {
                        stock : {
                            [Op.gt]: 0, 
                        }
                    },
                    include : ["Category","Subcategory"],
                    offset : quantityProducts*(+req.query.page-1),
                    limit : quantityProducts,
                })
            }
        }

        if (req.query.noStock) {

            noStockLink = "&noStock=1"

            products = Product.findAll({
                where : {
                    stock : {
                        [Op.lt]: 1,
                    }
                },
                include : ["Category","Subcategory"],
                offset : 0,
                limit : quantityProducts,
            })

            pagesCount = Product.findAll({
                where : {
                    stock : {
                        [Op.lt]: 1,
                    }
                },
                include : ["Category","Subcategory"],
            });

            if (+req.query.page>0){
                products = Product.findAll({
                    where : {
                        stock : {
                            [Op.lt]: 1,
                        }
                    },
                    include : ["Category","Subcategory"],
                    offset : quantityProducts*(+req.query.page-1),
                    limit : quantityProducts,
                })
            }
        }

        if (req.query.offers) {

            offersLink = "&offers=1"

            products = Product.findAll({
                where : {
                    discount : {
                        [Op.gt]: 0, 
                    }
                },
                include : ["Category","Subcategory"],
                offset : 0,
                limit : quantityProducts,
            })

            pagesCount = Product.findAll({
                where : {
                    discount : {
                        [Op.gt]: 0, 
                    }
                },
                include : ["Category","Subcategory"],
            });

            if (+req.query.page>0){
                products = Product.findAll({
                    where : {
                        discount : {
                            [Op.gt]: 0, 
                        }
                    },
                    include : ["Category","Subcategory"],
                    offset : quantityProducts*(+req.query.page-1),
                    limit : quantityProducts,
                })
            }
        }

        Promise.all([products,pagesCount,quantityProducts])
        .then(([products,pagesCount,quantityProducts]) => {

            let lastPage = Math.round(pagesCount.length/quantityProducts);
            let firstPage = lastPage - lastPage+1;
            let pageLinkFirst = "?page="+firstPage;
            let pageLinkLast = "?page="+lastPage;

            if (lastPage === 0) {
                pageLinkFirst = ""
                pageLinkLast = ""
            }

            console.log("LAST PAGE "+lastPage);
            console.log("FIRST PAGE "+firstPage);

            console.log("CALCULO DE PAGINAS :"+pagesCount.length/quantityProducts);

            if (+req.query.page < 1) {
                res.redirect(`/admin${pageLinkFirst}${searchQuery}${stockLink}${noStockLink}${offersLink}`)
            }
            else if(+req.query.page > Math.round(pagesCount.length/quantityProducts+1))
            {
                res.redirect(`/admin${pageLinkLast}${searchQuery}${stockLink}${noStockLink}${offersLink}`)
            }
            else
            {
                if (pagesCount.length < 8) {
                    pageActive = -1
                }

                res.render('admin/adminPanel',  {
                    productsData : products,
                    pagesCount : pagesCount.length,
                    pageActive,
                    searchQuery,
                    stockLink,
                    noStockLink,
                    offersLink,
                    quantityProducts,
                    session: req.session
                });
            }
            
        })
        .catch((err) => console.log("ERROR Lista Productos Admin: "+err));

    }
    ,
    admin_agregar: (req, res) => {

        let categoriesData = Category.findAll()
        let subCategoriesData = Subcategory.findAll()

        Promise.all([categoriesData, subCategoriesData])
        .then(([categoriesData, subCategoriesData]) => {
            res.render('admin/adminAddProduct',  {
                categoriesData,
                subCategoriesData,
                session: req.session
            });
        })
        .catch((err) => console.log("ERROR Vista Agregar Producto: "+err));
    }
    ,
    admin_carga_update: (req, res) => {
        let errors = validationResult(req);

        if (req.fileValidatorError) {
          let image = {
            param: "image_Route",
            msg: req.fileValidatorError,
          };
          errors.push(image);
        }

        if (errors.isEmpty()) {
          let arrayImages = [];
          if (req.files) {
            req.files.forEach((image) => {
              arrayImages.push(image.filename);
            });
          }

          let {
            name,
            price,
            description,
            color,
            stock,
            product_Category,
            product_Subcategory,
          } = req.body;
          /*  return res.json(req.body) */
          Product.create({
            name,
            price,
            finalPrice: +req.body.price,
            color,
            stock,
            discount: +req.body.discount ? discount : 0,
            description,
            product_Category,
            onSale: 0,
            product_Subcategory,
          })
            .then((product) => {
                console.log("AGREGAR PRODUCTO");

              if (arrayImages.length > 0) {
                let images = arrayImages.map((image) => {
                  return {
                    image_Route: image,
                    product_Id: product.id,
                  };
                });
                Product_Images.bulkCreate(images)
                  .then(() => res.redirect("/admin"))
                  .catch((err) => console.log(err));
              } else {
                Product_Images.create({
                  image_Route: "default.jpg",
                  product_Id: product.id,
                })
                  .then(() => res.redirect("/admin"))
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
        } else {
          let categoriesData = Category.findAll();
          let subCategoriesData = Subcategory.findAll();
          Promise.all([categoriesData, subCategoriesData]).then(
            ([categoriesData, subCategoriesData]) => {
              console.log("ERROR al Agregar Producto");
              res.render("admin/adminAddProduct", {
                categoriesData,
                subCategoriesData,
                errors: errors.mapped(),
                old: req.body,
                session: req.session,
              });
            }
          );
        }
    },
    admin_editar_producto: (req, res) => {

        const productToEdit = Product.findOne({
            where : {
                id : req.params.id
            },
            include : ["images","Category","Subcategory"]
        })

        const categoriesData = Category.findAll()
        const subCategoriesData = Subcategory.findAll()

        let sub1,sub2,sub3,sub4;

        for (let i = 0; i < 4; i++) {
            switch(i)
            {
                case 0:
                    sub1 = Subcategory.findAll({
                        where : {
                            category_Id : i+1
                        }
                    })
                    break;
                case 1:
                    sub2 = Subcategory.findAll({
                        where : {
                            category_Id : i+1
                        }
                    })
                    break;
                case 2:
                    sub3 = Subcategory.findAll({
                        where : {
                            category_Id : i+1
                        }
                    })
                    break;
                case 3:
                    sub4 = Subcategory.findAll({
                        where : {
                            category_Id : i+1
                        }
                    })
                    break;
            }
        }

        Promise.all([productToEdit, categoriesData, subCategoriesData,sub1,sub2,sub3,sub4])
        .then( ([productToEdit, categoriesData, subCategoriesData,sub1,sub2,sub3,sub4]) => {

            console.log("Cantidad de Categorias : "+categoriesData.length);
            
            res.render('admin/adminEditProduct',  {
                sub1,
                sub2,
                sub3,
                sub4,
                productToEdit,
                categoriesData,
                subCategoriesData,
                session: req.session,
                data : ""
            });
        })
        .catch((err) => console.log("ERROR Editando Producto: "+err));
    }
    ,
    admin_editar_producto_update: (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {
          let {
            name,
            color,
            price,
            onSale,
            stock,
            discount,
            description,
            product_Category,
            product_Subcategory,
          } = req.body;

          Product.update(
            {
              name,
              color,
              price,
              finalPrice: req.body.price - (req.body.price * req.body.discount) / 100,
              onSale,
              stock,
              discount,
              description,
              product_Category,
              product_Subcategory,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          )
            .then(() => {
              res.redirect("/admin");
            })
            .catch((error) =>
              console.log(
                "Error al Actualizar Producto : " +
                  error +
                  "++++++++++++++++++++++++++++++++++"
              )
            );
        } else {
          let categoriesData = Category.findAll();
          let subCategoriesData = Subcategory.findAll();

          Promise.all([categoriesData, subCategoriesData])
            .then(([categoriesData, subCategoriesData]) => {
              Product.findOne({
                where: {
                  id: req.params.id,
                },
              }).then((productToEdit) => {
                res.render("admin/adminEditProduct", {
                  categoriesData,
                  subCategoriesData,
                  productToEdit,
                  errors: errors.mapped(),
                  old: req.body,
                });
              });
            })
            .catch((err) =>
              console.log(
                "ERROR Ver Campos de Editar Producto " +
                  err +
                  "-----------------------------"
              )
            );
        }
    }
    ,
    banners: (req, res) => {
        
        Banner.findAll()
        .then(bannersData => {
            res.render('admin/addBanners',  {
                bannersData,
                session: req.session
            });
        })
    }
    ,
    banners_update: (req, res) => {

        let image_Route = req.file.filename;
        
        Banner.create({
            image_Route
        })
        .then(() => {
            res.redirect('/admin/banners')
        })
        .catch((err) => console.log("ERROR Agregando Banner: "+err));

    }
    ,
    subir_foto_producto: (req, res) => {
        Product_Images.create({
            image_Route : req.file.filename,
            product_Id: req.params.id
        })
    }
    ,
    searchAdmin: (req, res) => {
        let buscar = req.query.userSearch;

        if(buscar)
        {
            res.redirect(`/admin/usuarios?busqueda=${req.query.busqueda}`);
        }
        else
        {
            res.redirect(`/admin?busqueda=${req.query.busqueda}`);
        }        
    }
    ,
    borrar_banner: (req, res) => {

        Banner.findOne({
            where : {
                id: req.params.id
            }
        })
        .then(del => {
            eliminarBanner(del.image_Route);

            Banner.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(()=> {
    
                res.redirect('/admin/banners');
            })
            .catch(errr => {
                console.log("ERROR AL BORRAR BANNER : "+errr);
                res.redirect('/admin/banners');
            })
        })
        .catch(errr => {
            console.log("ERROR AL ENCONTRAR EL BANNER : "+errr);
            res.redirect('/admin/banners');
        })
    }
    ,
    borrar_Producto: (req, res) => {
        History.findAll({
            where : {
                product_ID : req.params.id
            }
        })
        .then(historyDestroy => {
            for (let i = 0; i < historyDestroy.length; i++) {
                History.destroy({
                    where : {
                        product_ID : historyDestroy[i].product_ID
                    }
                })
            }
        })

        Product.findByPk(req.params.id, {
            include: [{
                association: "images",
            }, ],
        })
        .then((product) => {
            for (let i = 0; i < product.images.length; i++) {
                eliminarImagen(product.images[i].image_Route);
            }
        })
        .catch((err) => console.log(err))
        .then(() => {
            Product.findByPk(req.params.id)
            .then((product) => {
                Product_Images.destroy({
                        where: {
                            product_Id: product.id
                        }
                    })
                    .then(() => {
                        Product.destroy({
                            where: {
                                id: +req.params.id
                            }
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err))
        .then(() => {
            res.redirect("/admin")
        }).catch(error => console.log(error))
    }
    ,
    borrar_usuario: (req, res) => {
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
            res.redirect('/admin/usuarios');
        })
        .catch(errr => {
            console.log("ERROR AL BORRAR USUARIO : "+errr);
            res.redirect('/admin/usuarios');
        })
    }
    ,
    borrar_foto_producto: (req, res) => {

        Product_Images.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(delThis => {
            eliminarImagen(delThis.image_Route);

            Product_Images.destroy({
                where: {
                    id: req.params.id
                }
            })
        })

    }
}