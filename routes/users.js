const users = require("express").Router();
const { User, validate } = require("../models/user");
const Favorite = require('../models/favorite')
const bcrypt = require("bcrypt");

users.get('/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    res.send(user)
  })
  .catch(err => {
    console.log(err)
    res.status(404).send('something went wrong :(')
  })
})

users.post("/", async (req, res) => {
  try {
    // Check for error validating user account creation form
    const { error } = validate(req.body);
    if (error) {
      res.status(404).send({ message: error.details[0].message });
    }

    // Make sure email hasn't been used
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).send({ message: "Account already exist with given email" });
    }

    // Salt and Hash Password
    const hashSaltPass = await bcrypt.hash(req.body.password, 12)
    req.body.password = hashSaltPass

    // Create new user in db
    await User.create(req.body);
    res.status(201).send({ message: "User successfully created" });
    
  } catch (error) {
    res.status(404).send({ message: "Server Error" });
  }
});

users.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(200).send('successfully deleted')
  })
  .catch(err => {
    console.log(err)
    res.status(404).send('something went wrong :(')
  })
})

users.post('/:id/favorite', (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    Favorite.create(req.body)
    .then(favorite => {
      user.favorites.push(favorite.id)
      user.save()
      .then(() => console.log('redirect here'))
    })
    .catch(err => {
      console.log(err)
      res.status(404).send('something went wrong')
    })
  })
  .catch(err => {
    console.log(err)
    res.status(404).send('something went wrong')
  })
})

users.delete('/:id/favorite/:favoriteId', (req, res) => {
  Favorite.findByIdAndDelete(req.params.favoriteId)
  .then(() => {
    res.status(200).send('successfully deleted')
  })
  .catch(err => {
    console.log(err)
    res.status(404).send('something went wrong :(')
  })
})

module.exports = users;
