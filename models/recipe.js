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
        required: false
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
        type: Image,
        required: false
    }
}, { timestamps: true })

// Model
const Recipe = mongoose.model("Recipe", recipeSchema)
module.exports = Recipe