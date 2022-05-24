require("dotenv").config();
const server = require('./src/server');
const { conn } = require('./src/db.js');
const {
  bulkCreateCategories,
  bulkCreateBrands,
  bulkCreateSubcategories,
  bulkCreateProducts,
  bulkCreateCountries,
  bulkCreateCities,
  bulkCreateUsers,
} = require("./src/utils/fillScript");

// Syncing all the models at once.
const PORT = process.env.PORT || 3001;
conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log('%s listening at ' + PORT); // eslint-disable-line no-console

        // Fill database from here. Disable the second time if force: false is activated
    // await bulkCreateCategories();
    // await bulkCreateBrands();
    // await bulkCreateSubcategories();
    // await bulkCreateProducts();
    // await bulkCreateCountries();
    // await bulkCreateCities();
    // disable this one if the app is already functional, just for testing.
    // await bulkCreateUsers();
    
  });
});

