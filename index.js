// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

//logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

function parseDate(dateString){
  if(dateString===undefined){
    return new Date()
  }else if (dateString.match(/^[0-9]+$/)){
    return new Date(Number(dateString))
  }else{
    return new Date(dateString)
  }
}

function dateIsValid(date){
  return !Number.isNaN(date.getTime())
}


app.get("/api/:date?", function (req, res) {
  const { date:dateString } = req.params;
  const dateObj = parseDate(dateString);
  const isValid = dateIsValid(dateObj);
  const response = isValid?
  {unix:dateObj.getTime(),utc:dateObj.toUTCString()}:
  {error:dateObj.toLocaleString()}
  // console.log(dateString,' ',dateObj, isValid, response)
  return res.json(response)
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
