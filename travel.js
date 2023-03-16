const express = require("express");

const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000

app.use(express.static("public"))

app.get("/", function(req, res) {
    res.redirect("/dashboard");
  });
  

app.get("/calculator", function(req, res) {
    res.sendFile(__dirname + "/calculator.html");
  });
  
  app.post("/result", function(req, res) {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const num3 = parseFloat(req.body.num3);
    const num4 = parseFloat(req.body.num4);
  
    const result = num1 + num2 + num3 + num4;
  
    res.render('result.ejs', {result });

  });
  
app.get("/dashboard", function(req, res) {
    res.render("dashBoard.ejs")
})

app.get("/whyTravel", function(req, res){
res.render("whyTravel.ejs")
})

app.get('/advisor', (req, res) => {
    res.render('advisor.ejs');
});


app.get("/about", function(req, res){
  res.render("about.ejs")
})


app.listen(PORT, function(req, res){
    console.log(`listening on port ${PORT}`)
})