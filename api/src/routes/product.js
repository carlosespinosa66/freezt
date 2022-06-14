const express = require("express");
const {
  createProduct,
  updateProduct,
  getProducts,
  getFilterProductsGenres,
  getFilterProductsType,
  getFilterProductsState,
  getSingleProduct,
  deleteProduct,
  getFilterProductsSearch,
  getFilterProductsSearchM,
  getFilterProductsSearchW
} = require("../controllers/product.js");

//Creating routes and adding the controllers.

const productRouter = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/auth");

//guest and user
productRouter.get("/products", getProducts);
productRouter.get("/products/type", getFilterProductsType);
productRouter.get("/products/state", getFilterProductsState);
productRouter.get("/products/genres", getFilterProductsGenres);
productRouter.get("/products/searchm", getFilterProductsSearchM);
productRouter.get("/products/searchw", getFilterProductsSearchW);
productRouter.get("/products/search", getFilterProductsSearch);


productRouter.get("/products/:id", getSingleProduct);

//admin
productRouter.put("/admin/products/:id", isLoggedIn, isAdmin, updateProduct);
productRouter.post("/admin/products", isLoggedIn, isAdmin, createProduct);
productRouter.put("/admin/products/del/:id", isLoggedIn, isAdmin, deleteProduct);

module.exports = productRouter;
