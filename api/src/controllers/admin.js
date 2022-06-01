const { User, Country,City } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//controllers that only admin can access.

const getName = async (id, type) => {
  let data_final;
  if (type === 'city') {
    let city = await City.findOne({ where: { id } });
    data_final = city.name ? city.name : '';
  } else if (type === 'country') {
    let country = await Country.findOne({ where: { id } });
    data_final = country.name ? country.name : '';
  }

  return data_final;
};



const adminGetUsers = async (req, res) => {
  try {
    let users = await User.findAll({});
   
    if (!users.length) {
      res.status(400).send({ errorMsg: "There are no users." });
    } else {
      const allusers = users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            role: user.role,
            email:user.email,
            password: user.password,
            surname: user.surname,
            shipping_address: user.shipping_address,
            shipping_city_id: user.shipping_city_id,
            shipping_country_id: user.shipping_country_id,
            shipping_postalcode: user.shipping_postalcode,
            billing_address: user.billing_address,
            billing_city_id: user.billing_city_id,
            billing_country_id: user.billing_country_id,
            billing_postalcode: user.billing_postalcode,
            role: user.role,
            isActive: user.isActive,
            tokens: user.tokens,
            needsPasswordReset: user.needsPasswordReset,
        };
      });

      res.status(200).send({ successMsg: "Here are your users.", data:  users });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminGetUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({ errorMsg: "Id was not provided." });
    }
    let user = await User.findOne({
      where: { id }
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    user = {
      id: user.id,
      name: user.name,
      role: user.role,
      email:user.email,
      password: user.password,
      surname: user.surname,
      shipping_address: user.shipping_address,
      shipping_city_id: user.shipping_city_id,
      shipping_city_name: await getName(user.shipping_city_id, 'city'),
      shipping_country_id: user.shipping_country_id,
      shipping_country_name: await getName(user.shipping_country_id, 'country'),
      shipping_postalcode: user.shipping_postalcode,
      billing_address: user.billing_address,
      billing_city_id: user.billing_city_id,
      billing_city_name: await getName(user.billing_city_id, 'city'),
      billing_country_id: user.billing_country_id,
      billing_country_name: await getName(user.billing_country_id, 'country'),
      billing_postalcode: user.billing_postalcode,
      role: user.role,
      isActive: user.isActive,
      tokens: user.tokens,
      needsPasswordReset: user.needsPasswordReset,
    };
    res.status(200).send({ successMsg: "Here is your user.", data: user });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminUpdateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({ errorMsg: "Id not provided." });
    }
    let user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    let { needsPasswordReset, role, isActive } = req.body;
    if (needsPasswordReset === undefined || !role || isActive === undefined) {
      return res.status(400).send({ errorMsg: "Missing data." });
    }
    await user.update({
      needsPasswordReset,
      role,
      isActive,
    });
    res
      .status(200)
      .send({ successMsg: "User successfully updated." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminCreateUser = async (req, res) => {
  try {
    let {
      name,
      surname,
      email,
      password,
      CountryId,
      role,
      isActive,
      billing_address,
      shipping_address,
      shipping_cityi_d,
      shipping_country_id,
      shipping_postalcode,
      billing_city_id,
      billing_country_id,
      billing_postalcode,            
    } = req.body;
    if (
      !name ||
      !surname ||
      !email ||
      !CountryId ||
      !password ||
      role === undefined ||
      isActive === undefined ||
      !billing_address ||
      !shipping_address
    ) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      const isUserCreated = await User.findOne({
        where: {
          email,
          signedInWithGoogle: false,
        },
      });
      if (isUserCreated) {
        res.status(400).send({ errorMsg: "Email already exists." });
      } else {
        password = await bcrypt.hash(password, 8);
        await User.create({
          name,
          surname,
          email,
          password,
          CountryId,
          billing_address,
          shipping_address,
          shipping_cityi_d,
          shipping_country_id,
          shipping_postalcode,
          billing_city_id,
          billing_country_id,
          billing_postalcode,            
          role,
          isActive,
        });
        res.status(201).send({ successMsg: "User successfully created." });
      }
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
  }
};

module.exports = {
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,
  adminCreateUser,
};
