require("dotenv").config();
const server = require('./src/app.js');

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log('%s listening at ' + PORT); // eslint-disable-line no-console
});


