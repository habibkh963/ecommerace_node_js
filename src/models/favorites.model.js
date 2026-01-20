
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const Product = require("./product.model");
const Favorite = sequelize.define(
    "Favorite",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

        product_id: { type: DataTypes.INTEGER },
        user_id: { type: DataTypes.INTEGER },

    },
    {
        tableName: "favorite", indexes: [
            { unique: true, fields: ["user_id", "product_id"] },
        ],
    },

);

// Relation
Product.hasMany(Favorite, { foreignKey: "product_id" });
User.hasMany(Favorite, { foreignKey: "user_id" });
Favorite.belongsTo(Product, { foreignKey: "product_id" });
Favorite.belongsTo(User, { foreignKey: "user_id" });

module.exports = Favorite;
