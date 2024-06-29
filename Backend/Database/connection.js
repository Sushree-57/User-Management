const { Sequelize } = require('sequelize');
//create sequlize instans and provide db information
const sequelize = new Sequelize('usermanagement', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

//check db connection 
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;