const express = require('express');
const app = express();
const langMiddleware = require("./middlewares/lang.middleware");
app.use(express.json());
app.use(langMiddleware);
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});
const productRoutes = require("./routes/product.routes");
app.use("/api/products", productRoutes);
const categoriesRoutes = require("./routes/categories.routes");
app.use("/api/category", categoriesRoutes);
const cartController = require("./routes/cart.routes");
app.use("/api/cart", cartController);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

module.exports = app;