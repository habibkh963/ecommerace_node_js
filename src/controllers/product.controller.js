/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

const Product = require("../models/product.model");
const Category = require("../models/category.model");
const { Op } = require("sequelize");
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


exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const search = req.query.search || "";

        const where =
            search.length > 0
                ? {
                    [Op.or]: [
                        { name_en: { [Op.like]: `%${search}%` } },
                        { name_ar: { [Op.like]: `%${search}%` } },
                    ],
                }
                : {};

        const { count, rows } = await Product.findAndCountAll({
            where,
            include: [
                {
                    model: Category,
                    attributes: ["id", "name_en", "name_ar"],
                },
            ],
            limit,
            offset,
            order: [["id", "DESC"]],
        });

        const localizedProducts = rows.map((p) => ({
            id: p.id,
            name: req.lang === "ar" ? p.name_ar : p.name_en,
            description: req.lang === "ar" ? p.description_ar : p.description_en,
            price: p.price,
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
