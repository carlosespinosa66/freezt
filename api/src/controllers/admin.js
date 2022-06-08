const { User, Country, City } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    let users = await User.findAll({ order: [['name', 'ASC']] });

    if (!users.length) {
      res.status(400).send({ errorMsg: 'There are no users.' });
    } else {
      const allusers = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
          password: user.password,
          surname: user.surname,
          phone: user.phone,
          shipping_address: user.shipping_address,
          shipping_city_id: user.shipping_city_id,
          shipping_country_id: user.shipping_country_id,
          shipping_postalcode: user.shipping_postalcode,
          role: user.role,
          isActive: user.isActive,
          tokens: user.tokens,
          needsPasswordReset: user.needsPasswordReset,
        };
      });

      res
        .status(200)
        .send({ successMsg: 'Here are your users.', data: allusers });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminGetUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({ errorMsg: 'Id was not provided.' });
    }
    let user = await User.findOne({
      where: { id },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: 'User not found.' });
    }
    user = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      password: user.password,
      surname: user.surname,
      role: user.role,
      isActive: user.isActive,
      tokens: user.tokens,
      needsPasswordReset: user.needsPasswordReset,
      phone: user.phone,
      shipping_address: user.shipping_address,
      shipping_city_id: user.shipping_city_id,
      shipping_city_name: await getName(user.shipping_city_id, 'city'),
      shipping_country_id: user.shipping_country_id,
      shipping_country_name: await getName(user.shipping_country_id, 'country'),
      shipping_postalcode: user.shipping_postalcode,
    };
    res.status(200).send({ successMsg: 'Here is your user.', data: user });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

// const adminUpdateUser = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (!id) {
//       return res.status(400).send({ errorMsg: 'Id not provided.' });
//     }
//     let user = await User.findOne({ where: { id } });
//     if (!user) {
//       return res.status(404).send({ errorMsg: 'User not found.' });
//     }
//     let { needsPasswordReset, role, isActive } = req.body;
//     if (needsPasswordReset === undefined || !role || isActive === undefined) {
//       return res.status(400).send({ errorMsg: 'Missing data.' });
//     }
//     await user.update({
//       needsPasswordReset,
//       role,
//       isActive,
//     });
//     res.status(200).send({ successMsg: 'User successfully updated.' });
//   } catch (error) {
//     res.status(500).send({ errorMsg: error.message });
//   }
// };

const adminUpdateUser = async (req, res) => {
  // const idUser = req.userID;
  const id = req.body.id;

  if (!id) {
    return res.status(400).send({ errorMsg: 'Id not provided.' });
  }
  let user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(404).send({ errorMsg: 'User not found.' });
  }
  if (user.signedInWithGoogle) {
    return res.status(400).send({
      errorMsg: 'You cannot modify all your data, please try other route.',
    });
  }
  let {
    name,
    surname,
    email,
    role,
    signedInWithGoogle,
    isActive,
    needsPasswordReset,
    phone,
    shipping_address,
    shipping_city_id,
    shipping_postalcode,
    shipping_country_id,
  } = req.body;
  try {
    if (!name || !surname || !email || !shipping_address) {
      return res.status(400).send({ errorMsg: 'Missing data.' });
    }
    if (email !== user.email) {
      let doesEmailExist = await User.findOne({
        where: {
          email,
          signedInWithGoogle: false,
        },
      });
      if (doesEmailExist) {
        return res.status(400).send({ errorMsg: 'Email is already in use.' });
      }
    }

    let updatedUser = await user.update({
      name,
      surname,
      email,
      role,
      signedInWithGoogle,
      isActive,
      phone,
      shipping_address,
      needsPasswordReset,
      phone,
      shipping_city_id,
      shipping_postalcode,
      shipping_country_id,
    });

    res.status(200).send({
      successMsg: 'User successfully updated.',
      data: {
        name: updatedUser.name,
        role: updatedUser.role,
        email: updatedUser.email,
        surname: updatedUser.surname,
        isActive: updatedUser.isActive,
        phone: updatedUser.phone,
        needsPasswordReset: updatedUser.needsPasswordReset,
        shipping_address: updatedUser.shipping_address,
        shipping_city_id: updatedUser.shipping_city_id,
        shipping_city_name: await getName(updatedUser.shipping_city_id, 'city'),
        shipping_country_id: updatedUser.shipping_country_id,
        shipping_country_name: await getName(
          updatedUser.shipping_country_id,
          'country'
        ),
        shipping_postalcode: updatedUser.shipping_postalcode,
      },
    });
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
      role,
      isActive,
      phone,
      shipping_address,
      shipping_city_id,
      shipping_country_id,
      shipping_postalcode,
      signedInWithGoogle,
    } = req.body;
    if (!name || !surname || !email || !password) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      const isUserCreated = await User.findOne({
        where: {
          email,
          signedInWithGoogle: false,
        },
      });
      if (isUserCreated) {
        res.status(400).send({ errorMsg: 'Email already exists.' });
      } else {
        password = await bcrypt.hash(password, 8);
        await User.create({
          name,
          surname,
          email,
          password,
          role,
          isActive,
          phone,
          shipping_address,
          shipping_city_id,
          shipping_country_id,
          shipping_postalcode,
        });
        res.status(201).send({ successMsg: 'User successfully created.' });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = {
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,
  adminCreateUser,
};
