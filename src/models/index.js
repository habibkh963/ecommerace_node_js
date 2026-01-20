const sequelize = require("../config/db");

const User = require("./user.model");
const Product = require("./product.model");
const Cart = require("./cart.model");
const CartItem = require("./cart.item.model");

/* Relations */
User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

Product.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
    sequelize,
    User,
    Product,
    Cart,
    CartItem,
};
