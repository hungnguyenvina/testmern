const express = require('express');
const app = express();
require('dotenv').config()
const mongo = require('mongodb');

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
mongoose.connect("mongodb://localhost:27017/mydb",{ useCreateIndex: true, useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function() {
  console.log("we're connected using mongoose....");
});

//Define a schema 
var Schema = mongoose.Schema; 
var UserSchema = new Schema ( 
{ 
    first_name: String, 
    last_name: String, 
    age: Number,
    email: String
}) 
const UserModel = mongoose.model('User', UserSchema);

//mongoose insert document
var newUser = new UserModel({
   first_name: 'John', 
   last_name: 'Nguyen', 
   age: 18,
   email: 'johnnguyen@gmail.com'
})
newUser.save(function(err,result){
  if(err) throw err;
  console.log('1 document inserted!');
  console.log(result);
})



/*



var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};
//Define a schema 
var Schema = mongoose.Schema; 
var UserSchema = new Schema ( 
{ 
    first_name: String, 
    last_name: String, 
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    }
}) 
const UserModel = mongoose.model('User', UserSchema);

//mongoose insert document
var newUser = new UserModel({
   first_name: 'John', 
   last_name: 'Nguyen', 
   email: 'johnnguyen@gmail.com'
})
newUser.save(function(err,result){
  if(err) throw err;
  console.log('1 document inserted!');
  console.log(result);
})*/

//query documents
/*UserModel.find({},function(err,results){
  if(err) throw err;
  console.log('Users documents!');
  console.log(results);
})

UserModel.findOne({},function(err,results){
  if(err) throw err;
  console.log('Single user document!');
  console.log(results);
})

UserModel.find( { email: 'vt2804@gmail.com' },function(err,results){
  if(err) throw err;
  console.log('Documents with condition !');
  console.log(results);
})

UserModel.findById( { _id: '5f5b22f95d70ef377cf225a3' },function(err,resultFindByID){
  if(err) throw err;
  console.log('resultFindByID !');
  console.log(resultFindByID);
  resultFindByID.last_name='Morrison';
  resultFindByID.save(function(errUpdate,resultUpdate){
    console.log('document after updated !');
    console.log(resultUpdate);
  });
})

UserModel.findByIdAndUpdate( { _id: '5f5b22f95d70ef377cf225a3' },
  {last_name: 'Morrison by findByIdAndUpdate with option new:true'},
  {new : true},
  function(err,resultFindByIdAndUpdate){
  if(err) throw err;
  console.log('resultFindByIdAndUpdate.................. !');
  console.log(resultFindByIdAndUpdate);
})

UserModel.findByIdAndDelete( { _id: '5f5b22f95d70ef377cf225a3' },
  function(err,findByIdAndDelete){
  if(err) throw err;
  console.log('findByIdAndDelete.................. !');
  console.log(findByIdAndDelete);
})
UserModel.findByIdAndRemove( { _id: '5f5b34e7ce702d82dd4e22a7' },
  {   select: 'email',rawResult: true } ,
  function(err,findByIdAndDelete){
  if(err) throw err;
  console.log('findByIdAndDelete.................. !');
  console.log(findByIdAndDelete);
})
*/



const port = process.env.PORT || 3004;

app.get('/', function(req,res){
    res.send('hello world from express js changes jjjj');
});

app.listen(port, () => {
    console.log('server is running at port '+ port);
})