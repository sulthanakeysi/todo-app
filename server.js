const express = require("express"),
      app = express(),
      router= require("./routes/index"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      layouts = require("express-ejs-layouts");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connecting to database
mongoose.connect("mongodb://sulthana:manjamma10@ds143666.mlab.com:43666/to-do",{ useNewUrlParser: true })
                .then(console.log("database connected"));


//setting view
app.set('view engine', 'ejs');
app.use(layouts);

app.use(express.static(__dirname + '/public'));
      

app.use('/' , router);


app.listen(3000, () => console.log("app listening"));