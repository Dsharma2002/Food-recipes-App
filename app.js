const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Recipe = require("./models/recipe")
const methodOverride = require("method-override")

// set view engine
app.set("view engine", "ejs")

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

const URL = `mongodb+srv://divi2002:divyansh@cluster0.wwyhn.mongodb.net/Cluster0?retryWrites=true&w=majority`
mongoose.connect(URL)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err))

app.get("/recipes", (req, res) => {
    Recipe.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("home", { title: "HOME", recipes: result })
        })
        .catch(err => console.log(err))
})

app.get("/", (req, res) => {
    res.redirect("/recipes")
})

app.get("/recipes/create", (req, res) => {
    res.render("create", { title: "CREATE" })
})

app.get("/recipes/:id", async (req, res) => {
    const id = req.params.id
    const recipe = await Recipe.findById(id)
    if (recipe == null) {
        res.redirect("/recipes")
    } else {
        res.render("details", { title: "Recipe Details", recipe: recipe })
    }
})

app.get("/recipes/edit/:id", async (req, res) => {
    const id = req.params.id
    const recipe = await Recipe.findById(id)
    res.render("edit", { recipe: recipe, title: "EDIT" })
})

app.delete("/recipes/:id", (req, res) => {
    const id = req.params.id
    Recipe.findByIdAndDelete(id)
        .then(result => res.json({ redirect: "/recipes" }))
        .catch(err => console.log(err))
})

app.post("/recipes", (req, res) => {
    const recipe = new Recipe(req.body)
    recipe.save()
        .then(result => res.redirect("/recipes"))
        .catch(err => console.log(err))
})

app.put("/recipes/:id", async (req, res, next) => {
    const id = req.params.id
    req.recipe = await Recipe.findById(id)
    next()
}, saveRecipe('edit'))

function saveRecipe(path) {
    return async (req, res) => {
        let recipe = req.recipe
        recipe.name = req.body.name
        recipe.cookTime = req.body.cookTime
        recipe.ingredients = req.body.ingredients
        recipe.procedure = req.body.procedure
        try {
            recipe = await recipe.save()
            res.redirect(`/recipes/${recipe.id}`)
        } catch (err) {
            res.render(`/recipes/${path}`, { recipe: recipe })
        }
    }
}

// 404
app.use((req, res) => {
    res.status(404).render("404", { title: "404" })
})