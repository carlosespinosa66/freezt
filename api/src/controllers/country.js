const { Country, City } = require('../db');

const getCountries = async (req, res) => {
  try {
    let countries = await Country.findAll({
      order: [['name', 'ASC']],
    });
    if (!countries.length) {
      res.status(404).send({ errorMsg: 'Countries not found.' });
    }
    countries = countries.map((country) => {
      return {
        name: country.name,
        code: country.code,
        id: country.id,
      };
    });
    res
      .status(200)
      .send({ successMsg: 'Here are your countries.', data: countries });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};
const setCountries = async (req, res) => {
  try {
    let { name, code } = req.body;
    if (!name || !code) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      const [newCountry, created] = await Country.findOrCreate({
        where: {
          name,
          code,
        },
      });
      created
        ? res.status(201).send({
            successMsg: 'Country successfully created.',
            data: newCountry,
          })
        : res.status(400).send({ errorMsg: 'Country already exists.' });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getCitiesCountry = async (req, res) => {
  const { code } = req.query;
  try {
    let cities = await City.findAll({
      where: {
        code,
      },
      order: [['name', 'ASC']],
    });

    if (cities.length <= 0) {
      res.status(404).send({ errorMsg: 'Cities not found.' });
    } else {
      cities = cities.map((city) => {
        return {
          name: city.name,
          code: city.code,
          id: city.id,
        };
      });
      res
        .status(200)
        .send({ successMsg: 'Here are your cities.', data: cities });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getAllCities = async (req, res) => {
  try {
    let cities = await City.findAll({
      order: [['name', 'ASC']],
    });

    if (cities.length <= 0) {
      res.status(404).send({ errorMsg: 'Cities not found.' });
    } else {
      cities = cities.map((city) => {
        return {
          name: city.name,
          code: city.code,
          id: city.id,
        };
      });
      res
        .status(200)
        .send({ successMsg: 'Here are your cities.', data: cities });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = { getCountries, setCountries, getCitiesCountry, getAllCities };
