const users = require("express").Router();
const db = require('../models')

// Show Users
users.get('/', (req, res) => {
  db.User.find()
  .then(users => {
    res.status(200).send({userAccounts: users})
  })
  .catch(err => {
    res.status(404).send({message: 'something went wrong'})
    console.log(err)
  })
})

// Authenticate Login
users.get('/auth', (req, res) => {
  db.User.find(req.query.username)
  .then(user => {
    if(user){
      user.password == req.query.password ? res.send(1) : res.send(0)
    } else {
      res.send(0)
    }
  })
  .catch(err => {
    console.log(err)
    res.status(404).send({message: 'something went wrong'})
  })
})

// Get User by Id
users.get('/:id', (req, res) => {
  db.User.findById(req.params.id)
  .then(user => {
    res.send(user)
  })
  .catch(err => {
    console.log(err)
    res.status(404).send('something went wrong :(')
  })
})

// Create New User
users.post("/", (req, res) => {
  db.User.findOne({username: req.body.username})
  .then(user => {
    if(user){
      res.status(409).send({message: 'Username already taken', account: user})
    } else {
        db.User.create(req.body)
      .then(() => {
        res.status(202).send({message: 'Account created'})
      })
      .catch(err => {
        console.log(err)
        res.status(404).send({message: 'something went wrong'})
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(404).send({message: 'something went wrong'})
  })
});

// Delete User
users.delete('/:id', (req, res) => {
  db.User.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(200).send('successfully deleted')
  })
  .catch(err => {
    console.log(err)
    res.status(404).send('something went wrong :(')
  })
})

// Create Favorite Recipe
users.post('/:id/favorite', (req, res) => {
  db.User.findById(req.params.id)
  .then(user => {
    db.Favorite.create(req.body)
    .then(favorite => {
      user.favorites.push(favorite.id)
      user.save()
      .then(() => {
        console.log('redirect here')
        res.status(200).send({message: 'favorite successfully added'})
      })
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

// Delete Favorite Recipe
users.delete('/:id/favorite/:favoriteId', (req, res) => {
  db.Favorite.findByIdAndDelete(req.params.favoriteId)
  .then(() => {
    res.status(200).send('successfully deleted')
  })
  .catch(err => {
    console.log(err)
    res.status(404).send('something went wrong :(')
  })
})

module.exports = users;
