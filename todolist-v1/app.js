//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// const dom = new JSDOM(`list`);
// if(items>4){
//     dom.window.document.querySelector("#heading").classList.add("exceeded");
// }


const app=express();

let items=["Buy food","cook food","eat food"];
let workItems=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){

let day =date.getDate();
res.render("list",{listTitle:day,newListItems:items});
    
});

app.post("/",function(req,res){
   let item=req.body.newItem;
    console.log(req.body);
    console.log(req.body.list);
    console.log(req.body.newItem);
    if(req.body.list==="Work-List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work-List",newListItems:workItems});
});

app.post("/work",function(req,res){
    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});



app.listen(process.env.PORT||3000,function(req,res){
    console.log("Server is Running Good on Port 3000");
});