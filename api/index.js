const server = require('./src/app.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('%s listening at ' + PORT); // eslint-disable-line no-console
});

dotenv.config();   

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log ('Connected to DB')
}).catch((err)=> {
    console.log(err)
})

// const { Product } = mongoose.models;
