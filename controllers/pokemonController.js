// const { Router } = require('express');
const express = require('express');
const router = express.Router();

const Pokemon = require('../models').Pokemon;

// INDEX
router.get('/', (req ,res) => {
  Pokemon.findAll({ order: ['id'] }).then((pokemon) => {
    res.render('index.ejs', { 
      pokemon: pokemon 
    });
  });  
});


// NEW
router.get('/new', (req, res) => {
  res.render('new.ejs');
});

router.post('/', (req, res) => {
  Pokemon.create(req.body).then(() => {
    res.redirect('/pokemon');
  })
});


// EDIT
router.get('/:id/edit', (req, res) => {
  Pokemon.findByPk(req.params.id).then((pokemon) => {
    res.render('edit.ejs', {
      pokemon: pokemon
    });
  })
});

router.put('/:id', (req, res) => {
  Pokemon.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then(() => { 
    res.redirect('/pokemon');
  });
});


// SHOW
router.get('/:id', (req, res) => {
  Pokemon.findByPk(req.params.id).then((pokemon) => {
    res.render('show.ejs', {
      pokemon: pokemon,
    });
  })
});


// DELETE
router.delete('/:id', (req, res) => {
  Pokemon.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect('/pokemon');
  });
});

module.exports = router;