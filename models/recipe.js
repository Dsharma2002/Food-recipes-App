const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Structure of the recipe
const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    mainIngredient: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    procedure: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Model
const Recipe = mongoose.model("Recipe", recipeSchema)
module.exports = Recipe