const {
  Product,
  Question,
  Review,
  User,
} = require('../db');

const createProduct = async (req, res) => {
  try {
    let {
      name,
      price,
      description,
      image,
      imagesec,
      weight,
      stock,
      isInDiscount,
      discountPercent,
      type,
      genres,
      isActive,
    } = req.body;
    if (
      !name ||
      !image ||
      !price ||
      !description ||
      !weight ||
      !stock ||
      !type ||
      !discountPercent
    ) {
      res.status(402).send({ errorMsg: 'Missing data.' });
    } else {
      let [newProduct, created] = await Product.findOrCreate({
        where: {
          name,
          price,
          description,
          image,
          imagesec,
          weight,
          stock,
          isInDiscount,
          discountPercent,
          genres,
          type,
          isActive,
        },
      });
      created
        ? res.status(201).json({
            successMsg: 'The Product has been created.',
            data: newProduct,
          })
        : res.status(401).json({ errorMsg: 'Product already exists.' });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let {
      name,
      description,
      price,
      image,
      imagesec,
      weight,
      stock,
      isInDiscount,
      discountPercent,
      type,
      genres,
      isActive,
    } = req.body;
    if (!name || !description || !price || !image || !weight || !stock) {
      res.status(402).send({ errorMsg: 'Missing data.' });
    } else {
      let productToUpdate = await Product.findOne({
        where: {
          id,
        },
      });
      if (!productToUpdate) {
        res.status(401).send({ errorMsg: 'Product not found.' });
      } else {
        let productUpdated = await productToUpdate.update({
          name,
          price,
          description,
          image,
          imagesec,
          weight,
          stock,
          isInDiscount,
          discountPercent,
          type,
          genres,
          isActive,
        });
        res.status(200).send({
          successMsg: 'Product successfully updated.',
          data: productUpdated,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      let singleProduct = await Product.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Question,
            attributes: ['title', 'description', 'answer', 'id'],
          },
          {
            model: Review,
            attributes: ['title', 'description', 'stars', 'id'],
            include: [
              {
                model: User,
                attributes: ['name', 'surname'],
              },
            ],
          },
        ],
      });
      if (!singleProduct) {
        res.status(404).send({ errorMsg: 'Product not found.' });
      } else {
        singleProduct = {
          id: singleProduct.id,
          name: singleProduct.name,
          image: singleProduct.image,
          imagesec: singleProduct.imagesec,
          price: singleProduct.price,
          description: singleProduct.description,
          rating: singleProduct.rating,
          weight: singleProduct.weight,
          stock: singleProduct.stock,
          isInDiscount: singleProduct.isInDiscount,
          discountPercent: singleProduct.discountPercent,
          isActive: singleProduct.isActive,
          genres: singleProduct.genres,
          type: singleProduct.type,
          questions:
            singleProduct.Questions.length > 0
              ? singleProduct.Questions.map((question) => {
                  return { question };
                })
              : [],
          reviews:
            singleProduct.Reviews.length > 0
              ? singleProduct.Reviews.map((review) => {
                  return { review };
                })
              : [],
        };
        res
          .status(200)
          .send({ successMsg: 'Here is your product.', data: singleProduct });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getFilterProductsGenres = async (req, res) => {
  const { genres } = req.query;
  try {
    if (!genres) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      let filterProduct = await Product.findAll({
        where: {
          genres,
        },
      });
      if (!filterProduct) {
        res.status(404).send({ errorMsg: 'Product not found.' });
      } else {
        filterProduct = filterProduct.map((product) => {
          return {
            id: product.id,
            name: product.name,
            image: product.image,
            imagesec: product.imagesec,
            price: product.price,
            description: product.description,
            rating: product.rating,
            weight: product.weight,
            stock: product.stock,
            isInDiscount: product.isInDiscount,
            discountPercent: product.discountPercent,
            isActive: product.isActive,
            genres: product.genres,
            type: product.type,
          };
        });
        res
          .status(200)
          .send({ successMsg: 'Here is your product.', data: filterProduct });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};



const getFilterProductsType = async (req, res) => {
  const { type } = req.query;
  try {
    if (!type) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      let filterProduct = await Product.findAll({
        where: {
          type,
        },
      });
      if (!filterProduct) {
        res.status(404).send({ errorMsg: 'Product not found.' });
      } else {
        filterProduct = filterProduct.map((product) => {
          return {
            id: product.id,
            name: product.name,
            image: product.image,
            imagesec: product.imagesec,
            price: product.price,
            description: product.description,
            rating: product.rating,
            weight: product.weight,
            stock: product.stock,
            isInDiscount: product.isInDiscount,
            discountPercent: product.discountPercent,
            isActive: product.isActive,
            genres: product.genres,
            type: product.type,
          };
        });
        res
          .status(200)
          .send({ successMsg: 'Here is your product.', data: filterProduct });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};



const getFilterProductsSearch = async (req, res) => {
  const { name } = req.query;
  try {
    if (!genres) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      let filterProduct = await Product.findAll({
        where: {
          genres,
        },
      });
      if (!filterProduct) {
        res.status(404).send({ errorMsg: 'Product not found.' });
      } else {
        filterProduct = filterProduct.map((product) => {
          return {
            id: product.id,
            name: product.name,
            image: product.image,
            imagesec: product.imagesec,
            price: product.price,
            description: product.description,
            rating: product.rating,
            weight: product.weight,
            stock: product.stock,
            isInDiscount: product.isInDiscount,
            discountPercent: product.discountPercent,
            isActive: product.isActive,
            genres: product.genres,
            type: product.type,
          };
        });
        res
          .status(200)
          .send({ successMsg: 'Here is your product.', data: filterProduct });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};



const getFilterProductsState = async (req, res) => {
  const { state } = req.query;
  if (state==="active"){
    isActive=true
  } else {
    isActive=false
  }
  try {
    if (!state) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      let filterProduct = await Product.findAll({
        where: {
          isActive,
        },
      });
      if (!filterProduct) {
        res.status(404).send({ errorMsg: 'Product not found.' });
      } else {
        filterProduct = filterProduct.map((product) => {
          return {
            id: product.id,
            name: product.name,
            image: product.image,
            imagesec: product.imagesec,
            price: product.price,
            description: product.description,
            rating: product.rating,
            weight: product.weight,
            stock: product.stock,
            isInDiscount: product.isInDiscount,
            discountPercent: product.discountPercent,
            isActive: product.isActive,
            genres: product.genres,
            type: product.type,
          };
        });
        res
          .status(200)
          .send({ successMsg: 'Here is your product.', data: filterProduct });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};


const getProducts = async (req, res) => {
  try {
    let dataProduct = await Product.findAll({
      include: [
        {
          model: Question,
          attributes: ['title', 'description', 'answer', 'id'],
        },
        {
          model: Review,
          attributes: ['title', 'description', 'stars', 'id'],
          include: [
            {
              model: User,
              attributes: ['name', 'surname'],
            },
          ],
        },
      ],
    });
    if (!dataProduct) {
      res.status(404).send({ errorMsg: 'There are no products available.' });
    } else {
      // totalreviews = dataProduct[0].reviews.length >0 ? dataProduct[0].reviews.map((review) => {return { review }}) : [],
      dataProduct = dataProduct.map((product) => {
        return {
          id: product.id,
          name: product.name,
          image: product.image,
          imagesec: product.imagesec,
          price: product.price,
          description: product.description,
          rating: product.rating,
          weight: product.weight,
          stock: product.stock,
          isInDiscount: product.isInDiscount,
          discountPercent: product.discountPercent,
          isActive: product.isActive,
          genres: product.genres,
          type: product.type,
          questions:
            product.Questions.length > 0
              ? product.Questions.map((question) => {
                  return { question };
                })
              : [],
          reviews:
            product.Reviews.length > 0
              ? product.Reviews.map((review) => {
                  return { review };
                })
              : [],
        };
      });

      res
        .status(200)
        .json({ successMsg: 'Here are your products.', data: dataProduct });
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const { isActive } = req.body;

    if (!id) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      Product.update({ isActive: isActive }, { where: { id: id } });
      res.status(200).send({
        successMsg: 'Product deleted in Database',
        data: `Product id: ${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};



module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  getFilterProductsGenres,
  getFilterProductsType,
  getFilterProductsState,
  getFilterProductsSearch,
  deleteProduct,
};
