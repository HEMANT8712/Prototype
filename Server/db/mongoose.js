const mongoose = require('mongoose');

const {databasePassword, databaseUsername} = require('../config');
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${databaseUsername}:${databasePassword}@ds145584.mlab.com:45584/prototype`)
  .then(() => {
    console.log("DB connected!");
  })
  .catch(err => {
    console.log(err);
  });

module.exports = mongoose;
