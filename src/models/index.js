const sequelize = require("../config/db");

const User = require("./user.model");

const Product = require("./product.model");

const Cart = require("./cart.model");

const CartItem = require("./cart.item.model");

const Order = require("./order.model");

/* Relations */
User.hasOne(Cart, { foreignKey: "user_id" });

Cart.belongsTo(User, { foreignKey: "user_id" });

Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "cart_items" });

CartItem.belongsTo(Cart, { foreignKey: "cart_id", as: "cart", });

Product.hasMany(CartItem, { foreignKey: "product_id" });

CartItem.belongsTo(Product, { foreignKey: "product_id", as: 'product' });
//orders 
User.hasMany(Order, { foreignKey: "user_id" });

Order.belongsTo(User, { foreignKey: "user_id" });

Order.belongsTo(Cart,);

Cart.hasOne(Order,);



module.exports = {

    sequelize,

    User,

    Product,

    Cart,

    Order,

    CartItem,

};
