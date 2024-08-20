require('dotenv').config({ path: './.env' });

module.exports = {
  development: {
    username: 'root',
    password: 'shibaura-ichiba',
    database: 'mydatabase',
    host: process.env.DOCKER_DB_HOST || 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'shibaura-ichiba',
    database: 'mydatabase',
    host: process.env.DOCKER_DB_HOST || 'localhost',
    dialect: 'mysql'
  },
  production: {
    username: 'group02',
    password: 'grp2',
    database: 'g2_db',
    host: '172.27.0.15',
    port: '5432',
    dialect: 'postgres'
  }
};
