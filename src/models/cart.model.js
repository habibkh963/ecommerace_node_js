const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const CartItem = require("./cart.item.model");

const Cart = sequelize.define("Cart", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "cart" });



module.exports = Cart