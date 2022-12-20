const { Product } = require('../models')

const productData = [
	{
		name: 'Plain T-Shirt',
		description: 'test',
		price: 14.99,
		in_stock: 14,
		category_id: 1,
	},
	{
		name: 'Running Sneakers',
		description: 'test',
		price: 90.0,
		in_stock: 25,
		category_id: 5,
	},
	{
		name: 'Branded Baseball Hat',
		description: 'test',
		price: 22.99,
		in_stock: 12,
		category_id: 4,
	},
	{
		name: 'Top 40 Music Compilation Vinyl Record',
		description: 'test',
		price: 12.99,
		in_stock: 50,
		category_id: 3,
	},
	{
		name: 'Cargo Shorts',
		description: 'test',
		price: 29.99,
		in_stock: 22,
		category_id: 2,
	},
]

const seedProducts = () => Product.bulkCreate(productData)

module.exports = seedProducts
