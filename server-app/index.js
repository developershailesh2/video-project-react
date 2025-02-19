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
    var database = connectionObject.db("videodb");
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

app.get("/get-videos", (req , res) => {
  mongoClient.connect(connectionString).then(connectionObj => {
    var database = connectionObj.db("videodb");
    database.collection("tblvideos").find({}).toArray().then(documents =>{
      res.send(documents);
      res.end();
    })
  }).catch(error => console.log(error));
})

app.post("/add-video",(req , res)=>{
  mongoClient.connect(connectionString).then(connectionObj => {
    var database = connectionObj.db("videodb");
    var video = {
      VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            Views: parseInt(req.body.Views),
            CategoryId: parseInt(req.body.CategoryId),
            Comments: [req.body.Comments]
    }

    database.collection("tblvideos").insertOne(video).then(()=>{
      console.log(`Video Added`);
      res.end();
    })

  }).catch(error => console.log("Error in Adding video"))
})

app.post("/add-category",(req , res)=>{
  mongoClient.connect(connectionString).then(connectionObj => {
    var database = connectionObj.db("videodb");
    var category = {
      CategoryId : parseInt(req.body.CategoryId),
      CategoryName: req.body.CategoryName
    }
    database.collection("tblcategories").insertOne(category).then(()=>{
      console.log(`Category Added`);
      res.end();
    });
  });
});

app.get("/get-categories",(req , res)=>{
  mongoClient.connect(connectionString).then(connectionObj => {
    var database = connectionObj.db("videodb");
    database.collection("tblcategories").find({}).toArray().then(documents => {
      res.send(documents);
      res.end();
    });
  });
});

app.post("/add-category",(req , res) => {
  mongoClient.connect(connectionString).then(connectionObj => {
    var database = connectionObj.db("videodb");
    var category = {
      CategoryId : parseInt(req.body.CategoryId),
      CategoryName : req.body.CategoryName
    }

    database.collection("tblcategories").insertOne(category).then(()=>{
      console.log(`Category Added`);
      res.end();
    });
  });
});

app.get("/get-categories",(req , res)=>{
  mongoClient.connect(connectionString).then((connectionObj) => {
    var database = connectionObj.db("videodb");
    database.collection("tblcategories").find({}).toArray().then(documents =>{
      console.log(`Fetch Categories : `,documents);
      res.send(documents);
      res.end();
    })
  })
})

app.get("*", (req, res) => {
  res.send(`Invalid page request`);
});

app.listen(5050);
console.log(`Server Started at : http://127.0.0.1:5050`);
