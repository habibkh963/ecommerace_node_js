/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


const Category = require("../models/category.model");
const Favorite = require("../models/favorites.model");

const { Cart, CartItem, Product } = require("../models");
const sequelize = require("sequelize");
exports.createProduct = async (req, res) => {
    try {

        const { name_en, name_ar, description_en, description_ar, price, categoryId } = req.body;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            res.status(500).json({ message: req.t.NOT_FOUND });
        }

        const product = await Product.create({ name_en, name_ar, description_ar, description_en, price, categoryId });
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
// exports.getProducts = async (req, res) => {
//     try {



//         const products = await Product.findAll({ include: Category });


//         const localizedProducts = products.map((p) => ({
//             id: p.id,
//             name: req.lang === "ar" ? p.name_ar : p.name_en,
//             description: req.lang === "ar" ? p.description_ar : p.description_en,
//             price: p.price,
//             categoryId: p.categoryId,
//             category: {
//                 id: p.Category.id,
//                 name: req.lang === "ar" ? p.Category.name_ar : p.Category.name_en,
//             },
//         }));

//         return res.json(localizedProducts);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: req.t.SERVER_ERROR });
//     }
// };

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_en, name_ar, description_en, description_ar, price, categoryId } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: req.t.PRODUCT_NOT_EXISTS });
        }
        const updates = {};

        if (name_en !== undefined) updates.name_en = name_en;
        if (name_ar !== undefined) updates.name_ar = name_ar;
        if (description_en !== undefined) updates.description_en = description_en;
        if (description_ar !== undefined) updates.description_ar = description_ar;
        if (price !== undefined) updates.price = price;
        if (categoryId !== undefined) updates.categoryId = categoryId;
        if (categoryId) {
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(400).json({ message: req.t.CATEGORY_NOT_EXISTS });
            }
        }

        await product.update(updates);
        await product.reload();
        res.status(200).json({
            data: product,
            msg: req.t.PRODUCT_UPDATED
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const search = req.query.search || "";

        const where =
            search.length > 0
                ? {
                    [sequelize.Op.or]: [
                        { name_en: { [sequelize.Op.like]: `%${search}%` } },
                        { name_ar: { [sequelize.Op.like]: `%${search}%` } },
                    ],
                }
                : {};

        const { count, rows } = await Product.findAndCountAll({
            where,
            include: [
                {
                    model: Category,
                    attributes: ["id", "name_en", "name_ar"],
                }
                ,
                {
                    model: Favorite,

                    where: { user_id: req.user.id },
                    required: false, //if true only products that has favourites will back
                    attributes: ["id"],
                },

                {
                    model: CartItem,
                    where: {
                        cart_id: sequelize.literal(`(
        SELECT id FROM cart WHERE user_id = ${req.user.id}
      )`)
                    },
                    required: false, // LEFT JOIN
                    attributes: ["id", "quantity"],
                    include: [
                        {
                            model: Cart,
                            attributes: [],
                        },
                    ],
                },
            ],
            limit,
            offset,
            order: [["id", "DESC"]],
        });
        console.log(rows);
        const localizedProducts = rows.map((p) => ({
            id: p.id,
            name: req.lang === "ar" ? p.name_ar : p.name_en,
            description: req.lang === "ar" ? p.description_ar : p.description_en,
            price: p.price,
            is_favorite: p.Favorites.length > 0,
            is_in_cart: p.CartItems.length > 0,
            categoryId: p.categoryId,
            category: {
                id: p.Category.id,
                name: req.lang === "ar" ? p.Category.name_ar : p.Category.name_en,
            },
        }));

        const totalPages = Math.ceil(count / limit);

        return res.status(200).json({
            data: localizedProducts,
            pagination: {
                totalItems: count,
                totalPages,
                currentPage: page,
                limit,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};
