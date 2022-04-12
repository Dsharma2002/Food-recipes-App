const express = require("express")
const app = express()
const mongoose = require("mongoose")

// set view engine
app.set("view engine", "ejs")

// middleware
app.use(express.urlencoded({ extended: true }))

const URL = `mongodb+srv://divi2002:divyansh@cluster0.wwyhn.mongodb.net/Cluster0?retryWrites=true&w=majority`
mongoose.connect(URL)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err))

app.get("/recipes", (req, res) => {
    res.render("home", { title: "HOME" })
})

app.get("/", (req, res) => {
    res.redirect("/recipes")
})

app.get("/recipes/create", (req, res) => {
    res.render("create", { title: "CREATE" })
})
