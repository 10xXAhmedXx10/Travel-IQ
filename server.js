const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static("public"))

const cities = require( "./models/advisor.js");


app.get("/dashboard", function(req, res) {
    res.render("dashBoard.ejs")
})

app.get("/whyTravel", function(req, res){
res.render("whyTravel.ejs")
})

app.get('/advisor', (req, res) => {
    res.render('advisor.ejs', { cities: cities });
});

app.listen(PORT, function(req, res){
    console.log(`listening on port ${PORT}`)
})