const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('Mongoose connection succeeded.');
  } catch (error) {
    console.error(error);
  }
})();

module.exports = mongoose;
