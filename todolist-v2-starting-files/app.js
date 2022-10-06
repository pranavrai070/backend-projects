//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];


mongoose.connect("mongodb+srv://admin-pranav:2Y6VIdfaYoEGERTG@cluster0.8rr4a.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const itemsSchema = {
  name: String
};

const workSchema={
  name:String
};

const Work =mongoose.model("work",workSchema);

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];


app.get("/", function (req, res) {

const day= date.getDate();

  Item.find(function (err, founditems){

    if (founditems.length === 0){
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully Added")
        }
      })
      res.redirect("/")
    }else{
      res.render("list", {
        listTitle: day,
        newListItems: founditems
      });
    }
  })

});

// app.post("/", function (req, res) {

//   const itemName = req.body.newItem;

//   const item = new Item({
//     name:itemName
//   });
  
//   item.save();
//   res.redirect("/");

// });

app.post("/",function(req,res){
  
   console.log(req.body);
   
   if(req.body.list==="Work-List"){
    const workName=req.body.newItem;
    const work= new Work({
      name:workName
    });
    work.save();
    res.redirect("/work");
   }else{
    const itemName=req.body.newItem;
    const item = new Item({
      name:itemName
    });
    item.save();
    res.redirect("/");
   }

});


app.post("/delete",function(req,res){
  const checkedItemId= req.body.checkboxes;
  console.log(checkedItemId);
  Item.findByIdAndRemove(checkedItemId,function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
      console.log("Deleted Items Succesfully")
    }
  });
});


app.get("/work", function (req, res){
  
  Work.find(function (err, workitems){
      res.render("list", {
      listTitle: "Work-List",
      newListItems: workitems
    });
  })
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(process.env.PORT||3000, function () {
  console.log("Server started on port 3000");
});