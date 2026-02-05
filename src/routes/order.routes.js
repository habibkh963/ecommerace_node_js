const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middlewares");

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create an order from cart
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order_id:
 *                   type: integer
 *       400:
 *         description: Cart is empty
 *       500:
 *         description: Server error
 */
router.post("/", auth, orderController.orderCart);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders of the current user
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   cart_id:
 *                     type: integer
 *                   total_price:
 *                     type: number
 *                   delivery_fee:
 *                     type: number
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   items:
 *                     type: array
 *       500:
 *         description: Server error
 */
router.get("/", auth, orderController.getMyOrders);


module.exports = router;
