const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Structure of the recipe
const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    procedure: {
        type: String,
        required: true
    },
    localImg: {
        type: String,
        required: false
    }
}, { timestamps: true })

// Model
const Recipe = mongoose.model("Recipe", recipeSchema)
module.exports = Recipe