
const Product = require("../models/Product");

// Create order
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "Order items are required",
      });
    }

    if (
      !shippingAddress ||
      !shippingAddress.name ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.phone
    ) {
      return res.status(400).json({
        message: "Complete shipping address is required",
      });
    }

    const finalItems = [];
    let itemsPrice = 0;

    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} does not have enough stock`,
        });
      }

      const itemPrice =
        product.price * Number(item.quantity);

      itemsPrice += itemPrice;

      finalItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: Number(item.quantity),
        size: item.size || "",
        color: item.color || "",
      });
    }

    const shippingPrice = itemsPrice >= 5000 ? 0 : 250;

    const totalPrice = itemsPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems: finalItems,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // Reduce stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: -Number(item.quantity),
          },
        }
      );
    }

    const populatedOrder = await Order.findById(
      order._id
    )
      .populate("user", "name email")
      .populate("orderItems.product");

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("orderItems.product")
      .sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate("orderItems.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to view this order",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    if (status === "Delivered") {
      order.isPaid = true;
      order.paidAt = order.paidAt || new Date();
    }

    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("orderItems.product");

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
