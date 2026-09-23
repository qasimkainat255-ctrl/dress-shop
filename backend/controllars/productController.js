const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const {
      category,
      search,
      featured,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - create product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      sizes,
      colors,
      stock,
      featured,
    } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      !category ||
      !image
    ) {
      return res.status(400).json({
        message:
          "Name, description, price, category and image are required",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      sizes: sizes || [],
      colors: colors || [],
      stock: stock || 0,
      featured: featured || false,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = req.body.name ?? product.name;
    product.description =
      req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.category =
      req.body.category ?? product.category;
    product.image = req.body.image ?? product.image;
    product.sizes = req.body.sizes ?? product.sizes;
    product.colors = req.body.colors ?? product.colors;
    product.stock = req.body.stock ?? product.stock;
    product.featured =
      req.body.featured ?? product.featured;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};