const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
    username: String,
    recipeId: Number
})

module.exports = mongoose.model('Favorite', favoriteSchema)