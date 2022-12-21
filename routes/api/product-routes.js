const router = require('express').Router()
const { Product, Category, Tag, ProductTag } = require('../../models')

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
	Product.findAll({
		include: [
			Category,
			{
				model: Tag,
				through: ProductTag,
			},
		],
	})
		.then((products) => res.json(products))
		.catch((err) => {
			console.log(err)
			res.status(500).json(err)
		})
})

// get one product
router.get('/:id', (req, res) => {
	Product.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			Category,
			{
				model: Tag,
				through: ProductTag,
			},
		],
	})
		.then((products) => res.json(products))
		.catch((err) => {
			console.log(err)
			res.status(400).json(err)
		})
})

// create new product
router.post('/', (req, res) => {
	Product.create(req.body)
		.then((product) => {
			res.status(200).json(product)
		})
		.catch((err) => {
			console.log(err)
			res.status(400).json(err)
		})
})

// update product
router.put('/:id', (req, res) => {
	// update product data
	Product.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((product) => {
			// find all associated tags from ProductTag
			return ProductTag.findAll({ where: { product_id: req.params.id } })
		})
		.then((productTags) => {
			// get list of current tag_ids
			const productTagIds = productTags.map(({ tag_id }) => tag_id)
			// create filtered list of new tag_ids
			const newProductTags = req.body.tagIds
				.filter((tag_id) => !productTagIds.includes(tag_id))
				.map((tag_id) => {
					return {
						product_id: req.params.id,
						tag_id,
					}
				})
			// figure out which ones to remove
			const productTagsToRemove = productTags
				.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
				.map(({ id }) => id)

			// run both actions
			return Promise.all([
				ProductTag.destroy({ where: { id: productTagsToRemove } }),
				ProductTag.bulkCreate(newProductTags),
			])
		})
		.then((updatedProductTags) => res.json(updatedProductTags))
		.catch((err) => {
			// console.log(err);
			res.status(400).json(err)
		})
})

router.delete('/:id', (req, res) => {
	Product.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((products) => {
			console.log(products)
			res.json(products)
		})
		.catch((err) => {
			console.log(err)
			res.status(400).json(err)
		})
})

module.exports = router
