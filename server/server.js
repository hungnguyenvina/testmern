const express = require('express');
const app = express();
require('dotenv').config()
const path = require('path');
const mongo = require('mongodb');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
const CourseCategoryModel = require('./models/CourseCategory');
const CourseCategoryRoute = require('./routes/CourseCategoryRoute');
const GuestRoute = require('./routes/GuestRoute');
const CourseRoute = require('./routes/CourseRoute');
const UserRoute = require('./routes/UserRoute');
const CartRoute = require('./routes/CartRoute');
const TransactionRoute = require('./routes/TransactionRoute');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,  { useUnifiedTopology: true },function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("mydb");
  /*dbo.createCollection("products", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });*/

  /*var myobj = { name: "Nokia 8.3 5G", price: 800 };
  dbo.collection("products").insertOne(myobj, function(err, result) {
    if (err) throw err;
    console.log('1 documents inserted');
    db.close();
  });

  
  dbo.collection("products").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log('result with find all method');
    console.log(result);
    db.close();
  });

  dbo.collection("products").find({}, {projection:  { _id: 0, name: 1 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log('result with find all method, choose what properties need to display');
    console.log(result);
    db.close();
  });
  
  
  
 dbo.collection("products").findOne({},function(err, result) {
  if (err) throw err;
  console.log('result with find one method');
  console.log(result);
  db.close();
});*/

});


var mongoose = require('mongoose'); 
//mongoose.connect("mongodb://localhost:27017/vlms_mevnc",{ useCreateIndex: true, useNewUrlParser: true});
mongoose.connect("mongodb+srv://hungnguyen:Omc@567284@cluster0.maqcd.mongodb.net/vlms_mevnc?retryWrites=true&w=majority",{ useCreateIndex: true, useNewUrlParser: true});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function() {
  console.log("we're connected using mongoose....");
});


app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(cookieParser());

app.use('/uploads',express.static(path.resolve(__dirname,'uploads')));


app.use(express.static(path.resolve(__dirname,'../client','build')));

const port = process.env.PORT || 3004;

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "https://arcane-wave-25280.herokuapp.com");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET,POST, PUT,PATCH, DELETE");
  next();
});

app.get('/', function(req,res){
    res.send('hello world from express js changes jjjj');
});

app.use('/uploads',express.static(path.resolve(__dirname,'uploads')));

app.use('/api/course_categories', CourseCategoryRoute);
app.use('/api/courses', CourseRoute);
app.use('/api/users', UserRoute);
app.use('/api/carts', CartRoute);
app.use('/api/transactions', TransactionRoute);
app.use('/api', GuestRoute);


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('1');
    cb(null, 'server/uploads')
  },
  filename: function (req, file, cb) {
    console.log('2');
    console.log(file);
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })

app.post('/api/upload_file', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  console.log('3');
  console.log('upload file in progress...');
  console.log(req.body.filename);
  //if (!file) {
  //  const error = new Error('Please upload a file')
  //  error.httpStatusCode = 400
  //  return next(error)
  //}
   // res.send(file)
   res.json({url: 'http://localhost:3004/uploads/'+req.body.filename});
  //res.json({url: 'https://arcane-wave-25280.herokuapp.com/uploads/'+req.body.filename});
})


app.listen(port, () => {
    console.log('server is running at port '+ port);
})