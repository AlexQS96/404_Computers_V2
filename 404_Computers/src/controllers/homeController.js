const db = require('../database/models');
const Product = db.Product; 
const Category = db.Category;
const Banner = db.Banner;
const User = db.User;
const { Op } = require('sequelize');
const sequelize = require('sequelize');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    home: (req, res) => {
        const bannersData = Banner.findAll()
        const productsData = Product.findAll({
            include : ["images","Category","Subcategory"]
        })
        Promise.all([productsData,bannersData])
        .then(([productsData,bannersData]) =>{
            
            if(req.session.user)
            {
                User.findOne({
                    where : {
                        id : req.session.user.id
                    },
                    include: [{ association: "historyProducts"}] 
                })
                .then(user => {
                    let productsHistory = [];
                    let lastProduct = [];

                    if(user)
                    {

                        let lastProductSeen = user.historyProducts[user.historyProducts.length-1];
    
                        productsData.forEach(historyData => {
                            for (let i = 0; i < user.historyProducts.length; i++) {
                                if (user.historyProducts[i].product_ID === historyData.id) {
                                    productsHistory.push(historyData)
                                }
                            }
                        });
                        
                        if(lastProductSeen != null)
                        {
                            lastProduct = productsData.find(historyData => historyData.id === lastProductSeen.product_ID)
                        }
                    }


                    res.render('home' , {
                        productsData,
                        bannersData,
                        lastProduct,
                        pageURL : "productos",
                        userData : productsHistory,
                        sliderProducts : productsData,
                        session: req.session,
                        toThousand
                    });
                })
            }
            else
            {
                res.render('home' , {
                    productsData,
                    bannersData,
                    userData : [],
                    pageURL : "productos",
                    sliderProducts : productsData,
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
    location: (req, res) => {
        res.render('location',{
            session: req.session,
            pageURL : "productos"
        });
    }
    ,
    contact: (req, res) => {
        res.render('contact',{
            session: req.session,
            pageURL : "productos"
        });
    }
    ,
    about: (req, res) => {
        res.render('404computers',{
            session: req.session,
            pageURL : "productos"
        });
    }
    ,
    terms: (req, res) => {
        res.render('termsAndCond',{
            session: req.session,
            pageURL : "productos"
        });
    }
    ,
    privacy: (req, res) => {
        res.render('privacy',{
            session: req.session,
            pageURL : "productos"
        });
    }
    ,
    purchaseRegret: (req, res) => {
        res.render('purchaseRegret',{
            session: req.session,
            pageURL : "productos"
        });
    }
    ,
    resell: (req, res) => {
        res.render('resell',{
            session: req.session,
            pageURL : "productos"
        });
    }
    ,
    questions: (req, res) => {
        res.render('frequentQA',{
            session: req.session,
            pageURL : "productos"
        });
    }
}