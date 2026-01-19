const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./category.model");

const Product = sequelize.define(
    "Product",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name_ar: { type: DataTypes.STRING, allowNull: false },
        name_en: { type: DataTypes.STRING, allowNull: false },
        description_ar: { type: DataTypes.TEXT },
        description_en: { type: DataTypes.TEXT },
        price: { type: DataTypes.FLOAT, allowNull: false },
        categoryId: {
            type: DataTypes.INTEGER,
            references: { model: "categories", key: "id" },
        },
    },
    { tableName: "products" }
);

// Relation
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Product;
