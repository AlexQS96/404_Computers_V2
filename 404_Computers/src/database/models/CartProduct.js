module.exports = (sequelize, dataTypes) => {
    let alias = "CartProduct";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        cart_Product: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        user_ID: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        cart_Quantity: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
    }
    let config = {
        tableName: "cart_products",
        timestamps: false
    }

    const CartProduct = sequelize.define(alias, cols, config)

    CartProduct.associate = function(models) {
        CartProduct.belongsTo(models.User, {
            as: "User",
            foreignKey:"user_ID" 
        })

        CartProduct.belongsTo(models.Product, {
            as: "CartProducts",
            foreignKey:"cart_Product"
        })
    }

    return CartProduct;
}