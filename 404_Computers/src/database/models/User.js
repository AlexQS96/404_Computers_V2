module.exports = (sequelize,DataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        name: {
            type: DataTypes.STRING,
            allowNull : false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull : false
        },
        email: {
            type: DataTypes.STRING,
            allowNull : false
        },
        pass : {
            type: DataTypes.STRING,
            allowNull : false
        },
        role : {
            type: DataTypes.STRING
        },
        image : {
            type: DataTypes.STRING
        },
        address : {
            type: DataTypes.STRING
        },
        phone : {
            type: DataTypes.INTEGER
        },
        dni : {
            type: DataTypes.INTEGER
        },
        province : {
            type: DataTypes.STRING
        },
        city : {
            type: DataTypes.STRING
        },
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols , config);

    User.associate = models =>  {
        User.hasMany(models.History, {
            as: "historyProducts",
            foreignKey:"user_ID"
        })
        User.hasMany(models.CartProduct, {
            as: "cartProducts",
            foreignKey:"user_ID" 
        })
        User.hasMany(models.Favorite, {
            as: "favorites",
            foreignKey:"user_ID" 
        })
    }

    return User;
}