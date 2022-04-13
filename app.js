const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Recipe = require("./models/recipe")

// set view engine
app.set("view engine", "ejs")

// middleware
app.use(express.urlencoded({ extended: true }))

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

app.post("/recipes", (req, res) => {
    const recipe = new Recipe(req.body)
    recipe.save()
        .then(result => res.redirect("/recipes"))
        .catch(err => console.log(err))
})

app.get("/recipes/:id", (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
        .then(result => {
            res.render("details", { title: "Recipe Details", recipe: result })
        })
        .catch(err => console.log(err))
})

app.delete("/recipes/:id", (req, res) => {
    const id = req.params.id
    Recipe.findByIdAndDelete(id)
        .then(result => res.json({ redirect: "/recipes" }))
        .catch(err => console.log(err))
})

// 404
app.use((req, res) => {
    res.status(404).render("404", { title: "404" })
})