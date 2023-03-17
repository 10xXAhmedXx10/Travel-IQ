const express = require("express");

const app = express();

app.set("view engine", "ejs") //to  render the ejs files

const bodyParser = require("body-parser")

app.use(express.static("public")) //creat the css files

app.use(bodyParser.urlencoded({extended: true}))

let submissions = []; //this is array  for the share/post method

const PORT = process.env.PORT || 3000

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

app.get("/contact", function(req, res){
  res.render("contact.ejs")
})

app.get("/share", function(req, res){

  const today = new Date();

  let time = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
      
  let day = today.toLocaleDateString("en-US", time)

  res.render("share.ejs", {dayTIme: day})

});



app.post('/histroy', function(req, res) {
  const name = req.body.name;
  const place = req.body.place;
  const year = req.body.year;
  const img = req.body.img;
  const description = req.body.Description

  const submission = {
    name: name,
    place: place,
    year: year,
    img: img,
    description:description
  };

  submissions.push(submission);

  res.render('histroy.ejs', { submissions: submissions });
});



















app.listen(PORT, function(req, res){
    console.log(`listening on port ${PORT}`)
});

