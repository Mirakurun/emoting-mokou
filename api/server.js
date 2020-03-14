const result = require('dotenv').config();
const { mongoose } = require('./db/mongoose');

if (result.error) {
  throw result.error;
}

console.log(result.parsed);

const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
