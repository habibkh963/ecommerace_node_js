const Order = require("../models/order.model");
const OrderItem = require("../models/order.item.model");
const Cart = require("../models/cart.model");
const CartItem = require("../models/cart.item.model");
const Product = require("../models/product.model");

exports.orderCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({
            where: { user_id: userId },
        });

        if (!cart) {
            return res.status(400).json({ message: req.t.CART_EMPTY });
        }

        const cartItems = await CartItem.findAll({
            where: { cart_id: cart.id },
            include: [

                { model: Product, as: 'product' }

            ]


            ,
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: req.t.CART_EMPTY });
        }

        // ✅ حساب المجموع
        let total = 0;
        cartItems.forEach((i) => {
            total += i.qty * i.product.price;
        });

        const deliveryFee = 5;

        // ✅ إنشاء Order
        const order = await Order.create({
            user_id: userId,
            cart_id: cart.id,
            total_price: total,
            delivery_fee: deliveryFee,
        });

        // ✅ نسخ العناصر إلى OrderItems
        const orderItemsData = cartItems.map((i) => ({
            order_id: order.id,
            product_id: i.product_id,
            qty: i.qty,
            price: i.product.price,
        }));

        await OrderItem.bulkCreate(orderItemsData);

        // ✅ تنظيف الكارت
        await CartItem.destroy({ where: { cart_id: cart.id } });

        return res.status(201).json({
            message: req.t.ORDER_CREATED,
            order_id: order.id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { user_id: req.user.id },
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    include: ["Product"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};
