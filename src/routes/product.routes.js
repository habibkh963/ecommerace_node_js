const router = require("express").Router();
const productController = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middlewares");
const toggleFavoritesController = require("../controllers/toggle.favorites.controller");

router.post("/", auth, productController.createProduct);
router.get("/", auth, productController.getProducts);
router.patch("/:id", auth, productController.updateProduct);
router.post("/favorite/toggle", auth, toggleFavoritesController.toggleFavorite);

module.exports = router;
