const { Sequelize } = require('sequelize');
const config = require('./config/config.js');
const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('MySQL Connected...');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;