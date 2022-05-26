const express = require("express");
const  {getCountries, setCountries, getCitiesCountry,getAllCities}  = require("../controllers/country.js");

//Creating routes and adding the controllers.

const countryRouter = express.Router();

countryRouter.get("/countries", getCountries);
countryRouter.get("/cities/all", getAllCities);
countryRouter.get("/cities", getCitiesCountry);
countryRouter.post("/countries", setCountries);


module.exports = countryRouter;
