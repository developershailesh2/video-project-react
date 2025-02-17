var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var app = express();
// CORS is required for handling request methods like POST, PUT, DELETE
app.use(cors());
// Required for converting data into JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var connectionString = "mongodb://127.0.0.1:27017";

//API Routes

app.get("/get-admin", (req, res) => {
  mongoClient.connect(connectionString).then((connectionObject) => {
    var database = connectionObject.db("video-db");
    database
      .collection("tbladmin")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/get-users", (req, res) => {
  mongoClient.connect(connectionString).then((connectionObject) => {
    var database = connectionObject.db("videodb");
    database
      .collection("tblusers")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.post("/register-user", (req, res) => {
  mongoClient.connect(connectionString).then((connectionObject) => {
    var database = connectionObject.db("videodb");
    var user = {
      UserId: req.body.UserId,
      UserName: req.body.UserName,
      Password: req.body.Password,
      Email: req.body.Email,
      Mobile: req.body.Mobile,
    };
    database
      .collection("tblusers")
      .insertOne(user)
      .then(() => {
        console.log(`User Registered`);
        res.end();
      });
  });
});

app.get("*", (req, res) => {
  res.send(`Invalid page request`);
});

app.listen(5050);
console.log(`Server Started at : http://127.0.0.1:5050`);
