const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
    user: String,
    recipeId: Number
})

module.exports = mongoose.model('Favorite', favoriteSchema)