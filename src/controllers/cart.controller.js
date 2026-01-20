
const { Cart, CartItem, Product } = require("../models");
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity = 1 } = req.body;

        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ message: req.t.PRODUCT_NOT_EXISTS });
        }


        let cart = await Cart.findOne({ where: { user_id: userId } });

        if (!cart) {
            cart = await Cart.create({ user_id: userId });
        }


        let item = await CartItem.findOne({
            where: {
                cart_id: cart.id,
                product_id: product_id,
            },
        });

        if (item) {
            item.quantity = quantity;
            await item.save();
        } else {
            item = await CartItem.create({
                cart_id: cart.id,
                product_id: product_id,
                quantity: quantity,
            });
        }

        return res.status(200).json({
            msg: req.t.ITEM_ADDED_TO_CART,
            item,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};
