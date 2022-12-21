const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', (req, res) => {
	// find all tags
	Tag.findAll({
		include: [
			{
				model: Product,
				through: ProductTag,
			},
		],
	})
		.then((tags) => res.status(200).json(tags))
		.catch((err) => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
	// find a specific tag
	Tag.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Product,
				through: ProductTag,
			},
		],
	})
		.then((tag) => res.status(200).json(tag))
		.catch((err) => res.status(404).json(err))
})

router.post('/', (req, res) => {
	Tag.create(req.body)
		.then((tag) => res.status(200).json(tag))
		.catch((err) => res.status(404).json(err))
})

router.put('/:id', (req, res) => {
	// update a tag's name by its `id` value
	Tag.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((tag) => res.status(200).json(tag))
		.catch((err) => res.status(404).json(err))
})

router.delete('/:id', (req, res) => {
	// delete on tag by its `id` value
	Tag.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((tag) => res.status(200).json(tag))
		.catch((err) => res.status(404).json(err))
})

module.exports = router
