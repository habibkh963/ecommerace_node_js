const router = require("express").Router();
const categoriesController = require("../controllers/categories.controller");

router.post("/", categoriesController.createCategory);
// router.get("/", categoriesController.getProducts);

module.exports = router;
