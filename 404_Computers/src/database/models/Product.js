module.exports = (sequelize,DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        name: { 
            type : DataTypes.STRING,
            allowNull : false
        },
        color: { 
            type : DataTypes.STRING
        },
        price : { 
            type : DataTypes.DECIMAL,
            allowNull : false
        },
        finalPrice : { 
            type : DataTypes.DECIMAL,
            allowNull : false
        },
        stock : { 
            type : DataTypes.INTEGER
        },
        discount : { 
            type : DataTypes.INTEGER
        },
        onSale : { 
            type : DataTypes.BOOLEAN
        },
        description: { 
            type : DataTypes.TEXT
        },
        product_Category : { 
            type : DataTypes.INTEGER
        },
        product_Subcategory : { 
            type : DataTypes.INTEGER
        }
    }
    let config = {
        tableName: "products",
        timestamps: false
    }
    const Product = sequelize.define(alias, cols , config);
    Product.associate = function(models){
        Product.belongsTo(models.Category, {
            as : 'Category',
            foreignKey: 'product_Category',
            sourceKey: 'id',
            timestamps: false
        })

        Product.belongsTo(models.Subcategory, {
            as : 'Subcategory',
            foreignKey: 'product_Subcategory',
            sourceKey: 'id',
            timestamps: false
        })

        Product.hasMany(models.ProductImage, {
            as: "images",
            foreignKey: "product_Id"
        })

        Product.belongsTo(models.CartProduct, {
            as: "CartItem",
            foreignKey: "id"
        })
    }
    return Product;
}