const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static("public"))

app.get("/dashboard", function(req, res) {
    res.render("dashBoard.ejs")
})

app.get("/advisor", function (req, res) {
res.render("advisor.ejs")
})

app.listen(PORT, function(req, res){
    console.log(`listening on port ${PORT}`)
})