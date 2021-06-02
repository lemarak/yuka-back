const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const isAuthenticated = require("../middlewares/isAuthenticated");
const getProductApi = require("../middlewares/getProductApi");

// Post a new product from an user
router.post(
  "/product/scan/",
  isAuthenticated,
  getProductApi,
  async (req, res) => {
    try {
      const { codeBar } = req.fields;
      const user = req.user;
      const dateScan = new Date();
      const product = await Product.findOne({ codeBar: codeBar, user: user });

      if (!product && req.product) {
        const newProduct = Product({
          codeBar: codeBar,
          dateScan: dateScan,
          user: user,
        });
        await newProduct.save();
        res.status(200).json({
          codeBar,
          dateScan,
          add: "ok",
          product: req.product,
        });
      } else if (req.product) {
        res.status(200).json({
          codeBar,
          dateScan,
          add: "exists",
          product: req.product,
        });
      } else {
        res.status(200).json({
          add: "no product",
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// get all products from an user
router.get("/products/", isAuthenticated, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user }).sort("-dateScan");
    console.log(products);
    res.status(200).json({
      products: products,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get one product from API (A faire ou dans le front ?)

// Post a new favorite from an user
router.post("/favorite/", isAuthenticated, async (req, res) => {
  try {
    const { codeBar } = req.fields;
    const dateFavorite = new Date();
    const product = await Product.findOne({ codeBar, user: req.user });
    const action = product.favorite ? "remove" : "add";
    product.favorite = !product.favorite;
    await product.save();
    console.log(product);
    res.status(200).json({
      action,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get favorites from an user
router.get("/favorites/", isAuthenticated, async (req, res) => {
  try {
    const products = await Product.find({
      user: req.user,
      favorite: true,
    }).sort("-dateScan");
    console.log(products);
    res.status(200).json({
      products: products,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
