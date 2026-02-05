
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("../models/user.model")
const Cart = require("../models/cart.model")

const Order = sequelize.define(
    "Order",
    {

        id: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true,

        },


        user_id: { type: DataTypes.INTEGER, allowNull: false },

        status: {
            type: DataTypes.STRING,
            defaultValue: "pending", // pending | paid | shipped | done
        },

        delivery_fee: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    },

    {

        tableName:

            "orders"

    }
);

module.exports = Order;


