module.exports = (sequelize, DataTypes) => {
    let alias = "History";
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        user_ID: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        product_ID: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    }

    let config = {
        tableName : "history_products",
        timestamps: false
    }

    const History = sequelize.define(alias, cols, config)

    History.associate = models => {
       History.belongsTo(models.User, {
            as: "User",
            foreignKey:"user_ID" 
        })
    }

    return History;
}