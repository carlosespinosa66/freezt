const { Order, User, Order_detail, Product } = require('../db');
const { sendMailOrder, sendMailState } = require('./mailer');
require('dotenv').config();

const { ORDER_PAYMENT_TRANSFER } = process.env;

const getOrders = async (req, res) => {
  try {
    let Orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'surname', 'email'],
        },
        {
          model: Order_detail,
          attributes: ['amount', 'quantity'],
          include: [
            {
              model: Product,
              attributes: ['name', 'id', 'image', 'price'],
            },
          ],
        },
      ],
    });

    Orders = Orders.map((Order) => {
      return {
        id: Order.id,
        total_amount: Order.total_amount,
        email_address: Order.email_address,
        status: Order.status,
        user: Order.User.name + ' ' + Order.User.surname,
        userID: Order.User.id,
        billing_address: Order.billing_address,
        shipping_address: Order.shipping_address,
        shippingPrice: Order.shippingPrice,
        taxPrice: Order.taxPrice,
        paidAt: Order.paidAt,
        isPaid: Order.isPaid,
        createdAt: Order.createdAt,
        details:
          Order.Order_details.length > 0
            ? Order.Order_details.map((detail) => {
                return {
                  id: detail.id,
                  amount: detail.amount,
                  quantity: detail.quantity,
                  productName: detail.Product.name,
                  productId: detail.Product.id,
                  image: detail.Product.image,
                  price: detail.Product.price,
                };
              })
            : [],
      };
    });
    res.status(200).send({ successMsg: 'Here are your Orders.', data: Orders });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getUserOrdersServer = async (req, res) => {
  try {
    const id = req.userID;
    let Orders = await Order.findAll({
      where: {
        UserId: id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'surname', 'email'],
        },
        {
          model: Order_detail,
          attributes: ['amount', 'quantity', 'id'],
          include: [
            {
              model: Product,
              attributes: ['name', 'id', 'image', 'price'],
            },
          ],
        },
      ],
    });

    Orders = Orders.map((Order) => {
      return {
        id: Order.id,
        total_amount: Order.total_amount,
        email_address: Order.email_address,
        status: Order.status,
        user: Order.User.name + ' ' + Order.User.surname,
        userID: Order.User.id,
        billing_address: Order.billing_address,
        billing_address: Order.billing_address,
        shippingPrice: Order.shippingPrice,
        taxPrice: Order.taxPrice,
        paidAt: Order.paidAt,
        isPaid: Order.isPaid,
        createdAt: Order.createdAt,
        shipping_address: Order.shipping_address,
        details:
          Order.Order_details.length > 0
            ? Order.Order_details.map((detail) => {
                return {
                  id: detail.id,
                  amount: detail.amount,
                  quantity: detail.quantity,
                  productName: detail.Product.name,
                  productId: detail.Product.id,
                  image: detail.Product.image,
                  price: detail.Product.price,
                };
              })
            : [],
      };
    });

    res.status(200).send({ successMsg: 'Here are your orders.', data: Orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: error.message });
  }
};

//create order (when user creates account, or if there are no pending orders)
//Possible status: PENDING BILLED DELIVERED COMPLETED
//Fine
const createOrder = async (req, res) => {
  const UserId = req.userID;
  try {
    let allProductsOrder = req.body.orderItems;
    let allOrderAddress = req.body.shippingAddress;
    let allPaymentSource = req.body.paymentSource;
    let email_address = req.body.email_address;

    if (!UserId) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      let user = await User.findOne({ where: { id: UserId } });
      let [newOrder, created] = await Order.findOrCreate({
        where: { UserId, status: 'Pendiente' },
      });
      if (created) {
        await newOrder.update({
          email_address: user.email,
          billing_address:
            allOrderAddress.address +
            ' ' +
            allOrderAddress.city +
            ' ' +
            allOrderAddress.country,
          shipping_address:
            allOrderAddress.address +
            ' ' +
            allOrderAddress.city +
            ' ' +
            allOrderAddress.country,
          paymentSource: allPaymentSource,
        });
      }
      if (!allProductsOrder.length) {
        return res.status(200).send({
          successMsg: 'Order successfully created/updated.',
          data: newOrder,
        });
      }

      if (allPaymentSource === ORDER_PAYMENT_TRANSFER) {
        await sendMailOrder(
          email_address,
          'Confirmaci??n Orden de Compra',
          `<p>Su orden de Compra n??mero ${newOrder.id} ha sido generada. Recuerde enviarnos su comprobane de transferencia</p>`
        );
      }

      for (let product of allProductsOrder) {
        const amount = product.quantity * product.price;
        await createOrderDetail(
          newOrder.id,
          product.id,
          product.quantity,
          amount
        );
      }
      let Order_details = await Order_detail.findAll({
        where: { OrderId: newOrder.id },
        include: [
          {
            model: Product,
            attributes: ['name', 'id', 'image', 'price'],
          },
        ],
      });

      const totalAmount = Order_details.reduce((a, detail) => {
        return a + detail.dataValues.amount;
      }, 0);
      await newOrder.update({
        total_amount: totalAmount,
      });
      res.status(201).send({
        successMsg: 'Order successfully created/updated.',
        data: newOrder,
        Order_details,
      });
    }
  } catch (error) {
    res.
    status(500).send({ errorMsg: error.message });
  }
};

const updateOrderState = async (req, res) => {
  const id = req.params.id;
  let { status, email_address } = req.body;
  try {
    if (!id) {
      res.status(404).send({ errorMsg: 'Missing id.' });
    } else {
      let orderState;
      if (status === 'Pagada') {
        orderState = await Order.update(
          { status: status, isPaid: true, paidAt: Date.now() },
          { where: { id } }
        );
      } else {
        orderState = await Order.update({ status: status }, { where: { id } });
      }

      if (!orderState) {
        res.status(404).send({ errorMsg: 'order not found' });
      } else {
        if (status === 'Despachada') {
          await sendMailState(
            email_address,
            'Dispatch Order advice',
            `<p>Your order number ${id} has been dispatched. </p>`
          );
        }
        res
          .status(201)
          .send({ successMsg: 'Order has been updated', data: orderState });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

//send actual order (cart) with it's order-details included.
const getActiveOrder = async (req, res) => {
  try {
    const id = req.userID;
    let activeOrder = await Order.findOne({
      where: {
        UserId: id,
        status: 'Pendiente',
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'surname', 'email'],
        },
      ],
    });
    if (!activeOrder) {
      return res
        .status(404)
        .send({ errorMsg: "You don't have an active order." });
    }
    // currentOrder = {
    //   id: activeOrder.id,
    //   total_amount: activeOrder.total_amount,
    //   email_address: activeOrder.email_address,
    //   status: activeOrder.status,
    //   user: activeOrder.User.name + ' ' + activeOrder.User.surname,
    //   userID: activeOrder.User.id,
    //   billing_address: activeOrder.billing_address,
    //   shipping_address: activeOrder.shipping_address,
    //   billing_address: activeOrder.billing_address,
    //   shippingPrice: activeOrder.shippingPrice,
    //   taxPrice: activeOrder.taxPrice,
    //   paidAt: activeOrder.paidAt,
    //   isPaid: activeOrder.isPaid,
    //   createdAt: activeOrder.createdAt,
    // };

    let Order_details = await Order_detail.findAll({
      where: { OrderId: activeOrder.id },
      include: [
        {
          model: Product,
          attributes: ['name', 'id', 'image', 'price'],
        },
      ],
    });

    res.status(200).send({
      successMsg: 'Here is your order.',
      data: activeOrder,
      Order_details,
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getHistoryOrder = async (req, res) => {
  try {
    const userId = req.userID;
    const id = req.params.id;

    let historyOrder = await Order.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Order_detail,
          attributes: ['amount', 'quantity'],
          include: [
            {
              model: Product,
              attributes: ['name', 'id', 'image', 'price', 'stock'],
            },
          ],
        },
      ],
    });
    if (!historyOrder) {
      return res
        .status(404)
        .send({ errorMsg: "You don't have an active order." });
    }
    historyOrder = {
      id: historyOrder.id,
      total_amount: historyOrder.total_amount,
      email_address: historyOrder.email_address,
      status: historyOrder.status,
      billing_address: historyOrder.billing_address,
      shipping_address: historyOrder.shipping_address,
      billing_address: historyOrder.billing_address,
      shippingPrice: historyOrder.shippingPrice,
      paymentSource: historyOrder.paymentSource,
      taxPrice: historyOrder.taxPrice,
      paidAt: historyOrder.paidAt,
      isPaid: historyOrder.isPaid,
      createdAt: historyOrder.createdAt,
      details:
        historyOrder.Order_details.length > 0
          ? historyOrder.Order_details.map((detail) => {
              return {
                id: detail.id,
                amount: detail.amount,
                quantity: detail.quantity,
                productName: detail.Product.name,
                productId: detail.Product.id,
                image: detail.Product.image,
                price: detail.Product.price,
                stock: detail.Product.stock,
              };
            })
          : [],
    };
    res
      .status(200)
      .send({ successMsg: 'Here is your order.', data: historyOrder });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

//Fine
const createOrderDetail = async (OrderId, ProductId, quantity, amount) => {
  try {
    let product = await Product.findOne({
      where: {
        id: ProductId,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    let isOrderDetailCreated = await Order_detail.findOne({
      where: { OrderId, ProductId },
    });
    if (isOrderDetailCreated) {
      if (product.stock < isOrderDetailCreated.quantity + quantity) {
        let amount = product.price * product.stock;
        await isOrderDetailCreated.update({
          quantity: product.stock,
          amount,
        });
      } else {
        await isOrderDetailCreated.update({
          quantity: isOrderDetailCreated.quantity + quantity,
          amount: isOrderDetailCreated.amount + amount,
        });
      }
      return isOrderDetailCreated;
    } else {
      if (product.stock < quantity) {
        let amount = product.price * product.stock;
        let quantity = product.stock;
        let newOrderDetail = await Order_detail.create({
          OrderId,
          ProductId,
          quantity,
          amount,
        });
        return newOrderDetail;
      } else {
        let newOrderDetail = await Order_detail.create({
          OrderId,
          ProductId,
          quantity,
          amount,
        });
        return newOrderDetail;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getUserOrders = async (id) => {
  try {
    if (id) {
      let dataOrders = await Order.findAll({
        where: {
          UserId: id,
        },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'surname', 'email'],
          },
          {
            model: Order_detail,
            attributes: ['amount', 'quantity'],
            include: [
              {
                model: Product,
                attributes: ['name', 'id', 'image', 'price'],
              },
            ],
          },
        ],
      });
      if (dataOrders.length <= 0) {
        return 'This user has no orders.';
      }
      dataOrders = dataOrders.map((Order) => {
        return {
          id: Order.id,
          total_amount: Order.total_amount,
          email_address: Order.email_address,
          billing_address: Order.billing_address,
          shippingPrice: Order.shippingPrice,
          taxPrice: Order.taxPrice,
          UserID: Order.User.id,
          status: Order.status,
          paidAt: Order.paidAt,
          isPaid: Order.isPaid,
          createdAt: Order.createdAt,
          detail:
            Order.Order_details.length > 0
              ? Order.Order_details.map((detail) => {
                  return {
                    id: detail.id,
                    amount: detail.amount,
                    quantity: detail.quantity,
                    productName: detail.Product.name,
                    productId: detail.Product.id,
                    image: detail.Product.image,
                    price: detail.Product.price,
                  };
                })
              : [],
        };
      });
      return { dataOrders };
    }
  } catch (error) {
    console.log(error.message);
  }
};
const getFilterOrdersState = async (req, res) => {
  const { status } = req.query;
  try {
    let dataOrders = await Order.findAll({
      where: {
        status,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'surname', 'email'],
        },
        {
          model: Order_detail,
          attributes: ['amount', 'quantity'],
          include: [
            {
              model: Product,
              attributes: ['name', 'id', 'image', 'price'],
            },
          ],
        },
      ],
    });
    // if (dataOrders.length <= 0) {
    //   return res
    //     .status(404)
    //     .send({ errorMsg: "There aren't orders." });
    // }
    dataOrders = dataOrders.map((Order) => {
      return {
        id: Order.id,
        total_amount: Order.total_amount,
        email_address: Order.email_address,
        billing_address: Order.billing_address,
        shippingPrice: Order.shippingPrice,
        taxPrice: Order.taxPrice,
        UserID: Order.User.id,
        status: Order.status,
        paidAt: Order.paidAt,
        isPaid: Order.isPaid,
        createdAt: Order.createdAt,
      };
    });
    res
      .status(200)
      .send({ successMsg: 'Here are your Orders.', data: dataOrders });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updatePaypalOrder = async (req, res) => {
  let id = req.params.id;
  let { paymentSource, shippingPrice, taxPrice, email_address } = req.body.info;
  let orderIdPayment = req.body.info.orderIdPayment.id;
  try {
    let orderPaypal = await Order.findOne({
      where: { id },
      include: [
        {
          model: Order_detail,
          attributes: ['amount', 'quantity'],
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'image', 'price', 'stock'],
            },
          ],
        },
      ],
    });

    orderPaypal.Order_details.forEach(async (detail) => {
      await updateStockproducts(detail.Product.id, detail.quantity);
    });

    if (!orderPaypal) {
      res.status(401).send({ message: 'Order Not Found' });
    } else {
      let updatedOrder = await orderPaypal.update({
        status: 'BILLED',
        email_address: email_address,
        isPaid: true,
        paidAt: Date.now(),
        paymentSource: paymentSource,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        orderIdPayment: orderIdPayment,
        isDelivered: false,
      });

      await sendMailOrder(
        email_address,
        'Confirmation Order Advice',
        `<p>Your purchase order number ${id} has been canceled with the Paypal order ${orderIdPayment}. </p>`
      );

      let Order_details = orderPaypal.Order_details;
      res
        .status(201)
        .send({ successMsg: 'Order Paid', data: updatedOrder, Order_details });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updateNormalOrder = async (req, res) => {
  let id = req.params.id;
  let { paymentSource, shippingPrice, taxPrice, email_address } = req.body.info;
  // let orderIdPayment = req.body.info.orderIdPayment.id;
  try {
    let orderPaypal = await Order.findOne({
      where: { id },
      include: [
        {
          model: Order_detail,
          attributes: ['amount', 'quantity'],
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'image', 'price', 'stock'],
            },
          ],
        },
      ],
    });

    orderPaypal.Order_details.forEach(async (detail) => {
      await updateStockproducts(detail.Product.id, detail.quantity);
    });

    if (!orderPaypal) {
      res.status(401).send({ message: 'Order Not Found' });
    } else {
      let updatedOrder = await orderPaypal.update({
        status: 'TOCONFIRM',
        email_address: email_address,
        isPaid: false,
        paymentSource: paymentSource,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        isDelivered: false,
      });

      await sendMailOrder(
        email_address,
        'Confirmaci??n Orden de Compra',
        `<p>Su orden de Compra n??mero ${id} ha sido generada. Recuerde enviarnos su comprobane de transferencia</p>`
      );

      let Order_details = orderPaypal.Order_details;
      res
        .status(201)
        .send({ successMsg: 'Order Paid', data: updatedOrder, Order_details });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updateStockproducts = async (productId, quantity) => {
  const productupdate = await Product.findOne({
    where: {
      id: productId,
    },
  });

  if (productupdate.stock < quantity) {
    await productupdate.update({ stock: 0, isActive: false });
  } else {
    await productupdate.update({ stock: productupdate.stock - quantity });
  }
};

// const updateOrder = async (req, res) => {
//   const id = req.params.id;
//   let { shipping_address } = req.body;
//   try {
//     if (!id) {
//       res.status(404).send({ errorMsg: 'Missing id.' });
//     } else {
//       let orderShipping = await Order.update(
//         { shipping_address: shipping_address },
//         { where: { id } }
//       );
//       if (!orderShipping) {
//         res.status(404).send({ errorMsg: 'order not found' });
//       } else {
//         res
//           .status(201)
//           .send({ successMsg: 'Order has been updated', data: orderShipping });
//       }
//     }
//   } catch (error) {
//     res.status(500).send({ errorMsg: error.message });
//   }
// };

// *******add and remove a product from the detail******

//Add order detail, delete order detail or modify order detail (use aux functions)
// const addProductsOrder = async (req, res) => {
//   const id = req.userID;
//   try {
//     const { ProductId } = req.body;
//     if (!ProductId) {
//       return res.status(404).send({ errorMsg: 'Missing product ID.' });
//     } else {
//       let product = await Product.findOne({
//         where: {
//           id: ProductId,
//         },
//       });
//       const activeUserOrder = await Order.findOne({
//         where: {
//           UserId: id,
//           status: 'PENDING',
//         },
//       });
//       let orderDetail = await Order_detail.findOne({
//         where: {
//           OrderId: activeUserOrder.id,
//           ProductId,
//         },
//       });
//       if (!orderDetail) {
//         const newOrderDetail = await createOrderDetail(
//           activeUserOrder.id,
//           ProductId,
//           1,
//           product.price
//         );
//         await activeUserOrder.update({
//           total_amount: activeUserOrder.total_amount + product.price,
//         });
//         res.status(201).send({
//           successMsg: 'Product has been successfully added.',
//           data: newOrderDetail,
//         });
//       } else {
//         if (product.stock === orderDetail.quantity) {
//           return res
//             .status(400)
//             .send({ errorMsg: 'Exceeded available stock.' });
//         }
//         const amount = product.price * (orderDetail.quantity + 1);
//         let UpdatedOrderDetail = await orderDetail.update({
//           amount,
//           quantity: orderDetail.quantity + 1,
//         });
//         await activeUserOrder.update({
//           total_amount: activeUserOrder.total_amount + product.price,
//         });
//         res.status(200).send({
//           successMsg: 'Product has been successfully added.',
//           data: UpdatedOrderDetail,
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ errorMsg: error.message });
//   }
// };

// const removeProductsOrder = async (req, res) => {
//   const id = req.userID;
//   try {
//     const { ProductId } = req.body;
//     let product = await Product.findOne({
//       where: {
//         id: ProductId,
//       },
//     });
//     const activeUserOrder = await Order.findOne({
//       where: {
//         UserId: id,
//         status: 'PENDING',
//       },
//     });
//     let orderDetail = await Order_detail.findOne({
//       where: {
//         OrderId: activeUserOrder.id,
//         ProductId,
//       },
//     });
//     if (orderDetail.quantity === 1) {
//       return res
//         .status(400)
//         .send({ errorMsg: 'Cannot have less than one product.' });
//     }
//     const amount = product.price * (orderDetail.quantity - 1);
//     let UpdatedOrderDetail = await orderDetail.update({
//       amount,
//       quantity: orderDetail.quantity - 1,
//     });
//     let orderDetails = await Order_detail.findAll({
//       where: { OrderId: activeUserOrder.id },
//     });
//     const totalAmount = orderDetails.reduce((a, detail) => {
//       return a + detail.dataValues.amount;
//     }, 0);
//     await activeUserOrder.update({
//       total_amount: totalAmount,
//     });
//     res.status(201).send({
//       successMsg: 'Order has been updated',
//       data: UpdatedOrderDetail,
//     });
//   } catch (error) {
//     res.status(500).send({ errorMsg: error.message });
//   }
// };

// const deleteProductsOrder = async (req, res) => {
//   try {
//     const id = req.userID;
//     const { ProductId } = req.params;
//     if (!ProductId) {
//       return res.status(404).send({ errorMsg: 'Missing product ID' });
//     } else {
//       const activeUserOrder = await Order.findOne({
//         where: {
//           UserId: id,
//           status: 'PENDING',
//         },
//       });
//       let orderDetail = await Order_detail.findOne({
//         where: {
//           OrderId: activeUserOrder.id,
//           ProductId,
//         },
//       });
//       if (!orderDetail) {
//         return res.status(404).send({ errorMsg: 'Order detail not found.' });
//       }
//       await Order_detail.destroy({
//         where: {
//           id: orderDetail.id,
//         },
//       });
//       let orderDetails = await Order_detail.findAll({
//         where: { OrderId: activeUserOrder.id },
//       });
//       const totalAmount = orderDetails.reduce((a, detail) => {
//         return a + detail.dataValues.amount;
//       }, 0);
//       await activeUserOrder.update({
//         total_amount: totalAmount,
//       });
//       res.status(201).send({
//         successMsg: 'Order detail has been deleted',
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ errorMsg: error.message });
//   }
// };

module.exports = {
  createOrder,
  getOrders,
  getUserOrders,
  getUserOrdersServer,
  getActiveOrder,
  updateOrderState,
  updatePaypalOrder,
  updateNormalOrder,
  getHistoryOrder,
  getFilterOrdersState,
  // addProductsOrder,
  // removeProductsOrder,
  // deleteProductsOrder,
  //  updateOrder,
};
