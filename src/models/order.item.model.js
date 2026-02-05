const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./order.model");
const Product = require("./product.model");

const OrderItem = sequelize.define(
    "OrderItem",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        price: {
            type: DataTypes.FLOAT,
            allowNull: false, // سعر المنتج وقت الطلب
        },
    },
    { tableName: "order_items" }
);

Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = OrderItem;
