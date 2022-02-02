module.exports = (sequelize, dataTypes) => {
    let alias = "Favorite";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        favorite_Product: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        user_ID: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        
    }
    let config = {
        tableName: "favorites",
        timestamps: false
    }

    const Favorite = sequelize.define(alias, cols, config)

    Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {
            as: "User",
            foreignKey:"user_ID" 
        })
    }

    return Favorite;
}