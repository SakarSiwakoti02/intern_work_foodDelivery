module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
   
        foodName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2), // More precise for currency
            allowNull: false,
            validate: {
                isDecimal: true,
                min: 0,
            },
        },
        deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: true, // Adds createdAt and updatedAt fields
    });

    return Order;
};
