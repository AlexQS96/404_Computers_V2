module.exports = (sequelize,DataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        category_Name: {
            type : DataTypes.STRING,
            allowNull : false
        },
        category_Link: {
            type : DataTypes.STRING,
            allowNull : false
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);
    Category.associate = function(models){
        Category.hasMany(models.Subcategory, {
            as : 'SubCategory',
            foreignKey : 'id',
            timestamps : false
        })
        ,
        Category.hasMany(models.Product, {
            as : 'ProductCatg',
            foreignKey : 'product_Category',
            timestamps : false
        })
    }

    return Category;
}