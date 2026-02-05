const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middlewares");

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add item to cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post("/", auth, cartController.addToCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's shopping cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shopping cart retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 items:
 *                   type: array
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", auth, cartController.getCart);


module.exports = router;
