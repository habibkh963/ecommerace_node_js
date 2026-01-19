/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


const Category = require("../models/category.model");

exports.createCategory = async (req, res) => {
    try {

        const { name_en, name_ar } = req.body;
        // if (name_en) {
        //     const category = await Category.f(name_en);
        //     if (category) {
        //         res.status(500).json({ message: req.t.EXISTS });
        //     }
        // }

        const category_new = await Category.create({ name_en, name_ar });
        res.status(201).json(category_new);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};