const { Router } = require("express");
const data = require("../models/data");
const Product = require("../models/product.js");
const User = require("../models/user.js");
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler')
const generateToken  = require("../utils");

const router = Router();

router.get("/products", async (req, res) => {

    const products = await Product.find();
    res.status(200).json(products);
});

router.get("/products/slug/:slug", async (req, res) => {
    
    const product = await Product.findOne({ slug: req.params.slug }).exec()

    product ? res.status(200).json(product)
        : res.status(200).json({ Message: 'El producto no existe' });
});


router.get("/products/seed", async (req, res) => {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);

    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);

    // res.status(200).json({ createdUsers });
    res.status(200).json({ createdProducts, createdUsers });
    // res.status(200).json(data.users);
});

router.post("/users/signin", expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });  
})
 
);

module.exports = router;

// router.get("/", async (req, res) => {
   
//     // res.status(200).json(data.products);
// });

// router.get("/slug/:slug", async (req, res) => {

//     const product = data.products.find((x) => x.slug === req.params.slug);

//     console.log(req.params.slug);
//     product ? res.status(200).json(product)
//         : res.status(200).json({ Message: 'El producto no existe' });
// });

// router.get("/products/slug/:slug", async (req, res) => {

//     const product = data.products.find((x) => x.slug === req.params.slug);

//     console.log(req.params.slug);
//     product ? res.status(200).json(product)
//         : res.status(200).json({ Message: 'El producto no existe' });
// });