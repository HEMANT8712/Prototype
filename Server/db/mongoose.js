const mongoose = require('mongoose');

const {databasePassword, databaseUsername} = require('../config');
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${databaseUsername}:${databasePassword}@ds237563.mlab.com:37563/auth`)
  .then(() => {
    console.log("DB connected!");
  })
  .catch(err => {
    console.log(err);
  });

module.exports = mongoose;
