const express = require('express')
const router = express.Router()
const db = require('../db')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await db.findAll()
    res.render('index', { title: 'Lista de Clientes', docs })
  } catch (err) {
    next(err)
  }
})

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro' })
})

router.post('/new', async (req, res, next) => {
  const name = req.body.name
  const age = parseInt(req.body.age)

  try {
    const result = await db.insert({ name, age })
    console.log(result)
    res.redirect('/')
  } catch (err) {
    next(err)
  }
})

module.exports = router
