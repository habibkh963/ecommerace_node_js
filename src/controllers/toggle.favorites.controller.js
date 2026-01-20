const User = require("../models/user.model");
const Product = require("../models/product.model");
const Favorite = require("../models/favorites.model");

exports.toggleFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id } = req.body;

        const favorite = await Favorite.findOne({
            where: {
                user_id: userId,
                product_id: product_id,
            },
        });

        if (favorite) {
            await favorite.destroy();
            return res.status(200).json({
                isFavorite: false,
                msg: req.t.REMOVED_FROM_FAVORITES,
            });
        } else {
            await Favorite.create({
                user_id: userId,
                product_id: product_id,
            });
            return res.status(201).json({
                isFavorite: true,
                msg: req.t.ADDED_TO_FAVORITES,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR, });
    }
};
