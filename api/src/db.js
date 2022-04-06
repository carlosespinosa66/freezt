const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log ('Connected to DB')
}).catch((err)=> {
    console.log(err)
})




// sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product } = mongoose.models;


module.exports = {
  ...mongoose.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: mongoose,     // para importart la conexión { conn } = require('./db.js');
};
