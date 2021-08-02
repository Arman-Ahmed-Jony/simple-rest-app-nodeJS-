const express = require('express')

const router = express.Router()
const db = require('../database/mysql')

router.get('/', (req, res) => {
  db.models.product
    .findAll()
    .then((products) => {
      res.json(products)
    })
    .catch((err) => res.status(500).json(err))
})

router.post('/', (req, res) => {
  db.models.product
    .create({
      name: req.body.name,
      description: req.body.description
    })
    .then((product) => {
      res.json(product)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
  db.models.product
    .destroy({
      where: { id: req.params.id }
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err))
})

router.patch('/:id', (req, res) => {
  db.models.product
    .update(
      {
        name: req.body.name,
        description: req.body.description
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err))
})

module.exports = router
