var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


//*** Routes ***//

// Going to Index Page (Landing page)
app.get("/", function(req, res){
  res.render("index");
});

// Going to Resouces
app.get("/resources", function(req, res){
  res.render("resources");
});


//Going to Executive Members
app.get("/executives", function(req, res){
  res.render("executive-team");
});

//Going to Mentors
app.get("/mentors", function(req, res){
  res.render("mentors");
});

//Going To Join
app.get("/join", function(req, res){
  res.render("join");
});

//*** End of Routes ***//

//Deploying Server

app.listen(process.env.PORT || 3001, function(req, res){
  console.log("Server Up and Running at 3001");
})
