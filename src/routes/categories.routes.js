const router = require("express").Router();
const categoriesController = require("../controllers/categories.controller");
const auth = require("../middlewares/auth.middlewares");


router.post("/", auth, categoriesController.createCategory);
router.get("/", categoriesController.getCategories);
router.patch("/:id", auth, categoriesController.updateCategory);

module.exports = router;
