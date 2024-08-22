module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define("menu", {
        foodName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT, 
            allowNull: false,
            validate: {
                isFloat: true, 
                min: 0, 
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
    });

    return Menu;
};
