
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./product.model");
const Cart = require("./cart.model");

const CartItem = sequelize.define("CartItem", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cart_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
}, { tableName: "cart_items" });


module.exports = CartItem


// const cart = await Cart.findOne({
//   where: { user_id: req.user.id },
//   include: [{
//     model: CartItem,
//     include: [Product],
//   }],
// });
