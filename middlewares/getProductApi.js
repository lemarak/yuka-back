const axios = require("axios");

const getProductApi = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://fr.openfoodfacts.org/api/v0/product/${req.fields.codeBar}.json`
    );
    if (response.data.status !== 0) {
      req.product = response.data.product;
      next();
    } else {
      req.product = null;
      next();
    }
  } catch (error) {}
};

module.exports = getProductApi;
