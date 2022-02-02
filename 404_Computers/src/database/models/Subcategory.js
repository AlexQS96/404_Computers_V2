module.exports = (sequelize,DataTypes) => {
    let alias = 'Subcategory';
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        subcategory_Name: {
            type : DataTypes.STRING,
            allowNull : false
        },
        subcategory_Link: {
            type : DataTypes.STRING,
            allowNull : false
        },
        category_Id: {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    }

    let config = {
        tableName: "subcategories",
        timestamps: false
    }

    const Subcategory = sequelize.define(alias, cols , config);
    Subcategory.associate = function(models){
        Subcategory.belongsTo(models.Category,{
            as : 'Category',
            foreignKey : 'category_Id'
        })
        Subcategory.hasMany(models.Product,{
            as : 'Products',
            foreignKey : 'product_Subcategory'
        })
    }
    
    return Subcategory;
}