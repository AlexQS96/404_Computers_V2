module.exports = function(sequelize, DataTypes){
    let alias = "Banner";

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        image_Route: {
            type: DataTypes.STRING
        }
    }

    let config = {
        tableName: "banners",
        timestamps: false
    }

    const Banner = sequelize.define(alias, cols, config)

    return Banner
}