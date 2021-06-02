const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  codeBar: {
    type: String,
  },
  dateScan: {
    required: true,
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = Product;
