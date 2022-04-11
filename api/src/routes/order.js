const { Router } = require("express");
const Order = require("../models/order.js");
const expressAsyncHandler = require('express-async-handler');
const generateToken = require("../middleware/utils");
const dotenv = require('dotenv');

dotenv.config();


const orderRouter = Router();
orderRouter.post("/orders", expressAsyncHandler(async (req, res) => {
    try {

        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
          });
      
          const order = await newOrder.save();



          order
            ? res.status(201).send({
                successMsg: "The Order has been created.",
                data: order,
            })
            : res.status(401).json({ errorMsg: "Order already exists." });
    } catch (error) {
        res.status(500).send({ errorMsg: error.message });
    }

}))

module.exports = orderRouter;

