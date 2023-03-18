const mongoose = require("mongoose");
const express = require("express");
const TravelInfo = require('./models/travel-info');
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const cities = require('./models/cities');

const app = express();
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
mongoose.connect("mongodb+srv://Admin:Aoao0101@ga-database.qedkiq8.mongodb.net/travelinfo", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Server is ruining"))
  .catch(err => console.log(err));
app.get("/", function (req, res) {
  res.redirect("/dashboard");
});
app.get("/calculator", function (req, res) {
  res.sendFile(__dirname + "/calculator.html");
});
app.post("/result", function (req, res) {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const num3 = parseFloat(req.body.num3);
  const num4 = parseFloat(req.body.num4);
  const result = num1 + num2 + num3 + num4;
 res.render('result.ejs', { result });
});

app.get("/dashboard", function (req, res) {
  res.render("dashBoard.ejs");
});
app.get("/whyTravel", function (req, res) {
  res.render("whyTravel.ejs");
});
app.get('/advisor', function(req, res) {
  res.render('advisor.ejs', {cities: cities});
});
app.get("/about", function (req, res) {
  res.render("about.ejs");
});
app.get("/contact", function (req, res) {
  res.render("contact.ejs");
});
app.get("/share", function (req, res) {
  const today = new Date();
  let time = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", time);
  res.render("share.ejs", { dayTIme: day });
});
app.post('/history', function(req, res) {
  const { name, place, year, img, description } = req.body;
  const tripInfo = new TravelInfo({ 
    name: name, 
    place: place, 
    year: year, 
    img: img, 
    description: description 
  });
  tripInfo.save()
    .then(() => {
      console.log('saved to database');
      res.redirect('/history'); 
    })
    .catch(err => {
      console.error(err);
      res.redirect('/history');
    });
});

app.get('/travelinfo', async (req, res) => {
  try {
    const travelinfo = await TravelInfo.find({});
    res.render('index', { travelinfo: travelinfo });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/history', async (req, res) => {
  try {
    const travelInfo = await TravelInfo.find({});
    res.render('histroy.ejs', { travelInfo: travelInfo });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/history/:id/edit', async (req, res) => {
  try {
    const travelInfo = await TravelInfo.findById(req.params.id);
    res.render('editHistory.ejs', { travelInfo: travelInfo });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/history/:id/edit', async (req, res) => {
  const { name, place, year, img, description } = req.body;
  const id = req.params.id;

  try {
    const travelInfo = await TravelInfo.findById(id);
    if (!travelInfo) {
      return res.status(404).send('not found');
    }
    travelInfo.name = name;
    travelInfo.place = place;
    travelInfo.year = year;
    travelInfo.img = img;
    travelInfo.description = description;
    await travelInfo.save();
    res.redirect('/history');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/edit/:id', async (req, res) => {
  try {
    const travelInfo = await TravelInfo.findById(req.params.id);
    res.render('editHistory.ejs', { travelInfo: travelInfo });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/delete/:id', async (req, res) => {
  try {
    const deletedTravelInfo = await TravelInfo.findOneAndRemove({_id: req.params.id});
    if (!deletedTravelInfo) {
      return res.status(404).send('Travel info not found');
    }
    res.redirect('/history');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, function (req, res) {
  console.log(`listening on port ${PORT}`);
});

