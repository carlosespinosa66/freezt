require("dotenv").config();
const { Router } = require('express');
const data = require('../models/data');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const Order = require('../models/order.js');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const { generateToken, isAuth } = require('../middleware/auth');

const router = Router();

router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

router.get('/products/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).exec();

  product
    ? res.status(200).json(product)
    : res.status(200).json({ Message: 'El producto no existe' });
});

router.get('/products/seed', async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);

  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);

  // res.status(200).json({ createdUsers });
  res.status(200).json({ createdProducts, createdUsers });
  // res.status(200).json(data.users);
});

router.post(
  '/users/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    try {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
        } else {
          res
            .status(401)
            .send({
              data: 'Invalid email or password',
              message: 'Invalid email or password',
            });
        }
      } else {
        res
          .status(405)
          .send({
            data: 'Invalid email or password',
            message: 'Invalid email or password',
          });
      }
    } catch (error) {
      res.status(500).send({ errorMsg: error.message });
    }
  })
);

router.post(
  '/orders',
  isAuth,
  expressAsyncHandler(async (req, res) => {
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
            successMsg: 'The Order has been created.',
            data: order,
          })
        : res.status(401).json({ errorMsg: 'Order already exists.' });
    } catch (error) {
      res.status(500).send({ errorMsg: error.message });
    }
  })
);

router.get(
  '/orders/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    let id = req.params.id;
    try {
      if (!id) {
        res.status(401).json({ errorMsg: 'missing id' });
      } else {
        const orderById = await Order.findById(id);
        orderById
          ? res.status(201).send({
              successMsg: 'This is your Order.',
              data: orderById,
            })
          : res.status(401).json({ errorMsg: "Order doesn't exists." });
      }
    } catch (error) {
      res.status(500).send({ errorMsg: error.message });
    }
  })
);

router.post(
  '/users/signup',
  expressAsyncHandler(async (req, res) => {
    try {
      const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      });
      const user = await newUser.save();
      res.status(200).send({
        successMsg: 'Succesful register',
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } catch (error) {
      res.status(500).send({ errorMsg: error.message });
    }
  })
);

router.get('/admin/paypal', async (req, res) => {
  try {
    created
      ? res.status(201).json({ data: process.env.PAYPAL_CLIENT_ID })
      : res.status(401).json({ errorMsg: 'Product already exists.' });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
});

router.put(
  '/orders/pay/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      let id = req.params.id;
      let { orderPaypal } = req.body;
      const order = await Order.findById(id);
      // const order = await Order.findOne({_id: req.params.id})
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: orderPaypal.id,
          payer_id: orderPaypal.payer.payer_id,
          status: orderPaypal.status,
          update_time: orderPaypal.update_time,
          email_address: orderPaypal.payer.email_address,
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', data: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    } catch (error) {
      res.status(500).send({ errorMsg: error.message });
    }
  })
);

module.exports = router;
