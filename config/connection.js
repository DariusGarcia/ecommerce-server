require('dotenv').config()

const Sequelize = require('sequelize')

const sequelize = process.env.JAWSDB_URL
	? new Sequelize(process.env.JAWSDB_URL)
	: new Sequelize('customers', 'root', 'Slugger132435!', {
			host: 'localhost',
			dialect: 'mysql',
			dialectOptions: {
				decimalNumbers: true,
			},
	  })

module.exports = sequelize
