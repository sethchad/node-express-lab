const express = require('express');
const router = express.Router();

const User = require('../models').User;
const Pokemon = require('../models').Pokemon;
const Team = require('../models').Team;

// INDEX
router.get('/', (req, res) => {
  res.render('users/index.ejs');
});

// GET SIGNUP FORM
router.get('/signup', (req, res) => {
  res.render('users/signup.ejs')
});

// GET LOGIN PAGE
router.get('/login', (req, res) => {
  res.render('users/login.ejs');
});


// POST LOGIN
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    }
  }).then((foundUser) => {
    res.redirect(`/users/profile/${foundUser.id}`);
  })
});

// POST - CREATE NEW USER FROM SIGNUP FORM
router.post('/', (req, res) => {
  User.create(req.body).then((newUser) => {
    res.redirect(`/users/profile/${newUser.id}`);
  });
});

// GET USER PROFILE
router.get('/profile/:id', (req, res) => {
  User.findByPk(req.params.id, {
    include: [{ model: Pokemon }, { model: Team }],
  }).then((user) => {
    Team.findAll().then((team) => {
      res.render('users/profile.ejs', { user, team });
    });
  });
});

// EDIT PROFILE
router.put("/profile/:id", (req, res) => {
  User.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then(() => {
    Team.findByPk(req.body.team).then((team) => {
      User.findByPk(req.params.id).then((user) => {
        console.log('team', team, 'user', user);
        //user.addTeam(team);  -- TypeError: user.addTeam is not a function
        res.redirect(`/users/profile/${req.params.id}`);
      });
    });
  });
});

// DELETE USER
router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id }}).then(() => {
    res.redirect("/users");
  });
});

module.exports = router;