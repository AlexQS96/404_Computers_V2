module.exports = (sequelize, dataTypes) => {
    let alias = "Purchase";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        buyer_ID: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        item_Name: {
            type: dataTypes.STRING,
        },
        item_ID: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        item_Price: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        item_Quantity: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        order_ID: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        payment_Option: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        homeAddress: {
            type: dataTypes.STRING,
        },
        cpCode: {
            type: dataTypes.STRING,
        },
        nameCard: {
            type: dataTypes.STRING,
        },
        cardNumber: {
            type: dataTypes.STRING,
        },
        monthCard: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        yearCard: {
            type: dataTypes.STRING,
        },
        cvvCard: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
    }
    let config = {
        tableName: "purchase",
        timestamps: false
    }

    const Purchase = sequelize.define(alias, cols, config)

    return Purchase;
}