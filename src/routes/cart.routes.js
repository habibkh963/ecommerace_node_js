const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middlewares");


router.post("/", auth, cartController.addToCart);


module.exports = router;
