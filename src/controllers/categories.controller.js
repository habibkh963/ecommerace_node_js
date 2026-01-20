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
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_en, name_ar } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: req.t.CATEGORY_NOT_EXISTS });
        }

        const updates = {};

        if (name_en !== undefined) updates.name_en = name_en;
        if (name_ar !== undefined) updates.name_ar = name_ar;
        await category.update(updates);

        res.status(200).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};


exports.getCategories = async (req, res) => {
    try {

        // const { name_en, name_ar } = req.body;
        // if (name_en) {
        //     const category = await Category.f(name_en);
        //     if (category) {
        //         res.status(500).json({ message: req.t.EXISTS });
        //     }
        // }

        const categories = await Category.findAll();


        res.status(200).json(categories);
    } catch (err) {

        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};