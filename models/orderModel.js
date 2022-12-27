const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  userEmail: {
    type: String
  },
  products: [
    {
      productName: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: Number
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;