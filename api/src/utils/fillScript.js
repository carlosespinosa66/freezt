const {
  Category,
  Brand,
  Subcategory,
  Product,
  Country,
  City,
  User,
} = require('../db');
const fs = require('fs');
const axios = require('axios');
const bcrypt = require('bcrypt');

//Just to fill the db.
const bulkCreateCategories = async () => {
  try {
    let data = fs.readFileSync(__dirname + '/../json/categories.json', 'utf8');
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Category.findOrCreate({
        where: {
          name: data[i].name,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateBrands = async () => {
  try {
    let data = fs.readFileSync(__dirname + '/../json/brands.json', 'utf8');
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Brand.findOrCreate({
        where: {
          name: data[i].name,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateSubcategories = async () => {
  try {
    let data = fs.readFileSync(
      __dirname + '/../json/subcategories.json',
      'utf8'
    );
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Subcategory.findOrCreate({
        where: {
          name: data[i].name,
          CategoryId: data[i].category_id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateProducts = async () => {
  try {
    let data = fs.readFileSync(__dirname + '/../json/products.json', 'utf8');
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      let name = data[i].name;
      let image = data[i].image;
      let imagesec = data[i].imagesec;
      let price = data[i].price;
      let description = data[i].description;
      let weight = data[i].weight;
      let stock = data[i].stock;
      let type = data[i].type;
      let genres = data[i].genres;

      await Product.create({
        name,
        image,
        imagesec,
        price,
        description,
        weight,
        stock,
        type,
        genres,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateCountries = async () => {
  try {
    let data = fs.readFileSync(__dirname + '/../json/countries.json', 'utf8');
    data = JSON.parse(data);
    const countries = data.map((country) => {
      return { name: country.name.common, code: country.cca3 };
    });
    for (let i = 0; i < countries.length; i++) {
      await Country.findOrCreate({
        where: {
          name: countries[i].name,
          code: countries[i].code,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateCities = async () => {
  let n = 0;
  try {
    let data = fs.readFileSync(__dirname + '/../json/cities.json', 'utf8');
    data = JSON.parse(data);
    const cities = data.map((city) => {
      return { name: city.city_ascii, code: city.iso3 };
    });
    for (let i = 0; i < cities.length; i++) {
      await City.findOrCreate({
        where: {
          name: cities[i].name,
          code: cities[i].code,
        },
      });
    }

        
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateUsers = async () => {
  try {
    let data = fs.readFileSync(__dirname + '/../json/users.json', 'utf8');
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      data[i].password = await bcrypt.hash(data[i].password, 8);
      await User.findOrCreate({
        where: {
          name: data[i].name,
          surname: data[i].surname,
          password: data[i].password,
          email: data[i].email,
          billing_address: data[i].billing_address,
          shipping_address: data[i].shipping_address,
          shipping_city_id:data[i].shipping_city_id,
          shipping_country_id:data[i].shipping_country_id,
          billing_city_id:data[i].billing_city_id,
          billing_country_id:data[i].billing_country_id,          
          role: data[i].role,
          isActive: data[i].isActive,
          needsPasswordReset: data[i].needsPasswordReset,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  bulkCreateCategories,
  bulkCreateBrands,
  bulkCreateSubcategories,
  bulkCreateProducts,
  bulkCreateCountries,
  bulkCreateCities,
  bulkCreateUsers,
};
