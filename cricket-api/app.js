const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs =require("ejs");

const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:true}));

app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/cricketDB',{useNewUrlParser: true});

const playerSchema = {
    name:String,
    about:String
};

const Player = mongoose.model("Player",playerSchema);


////////////////////////////////////////////CRUD operations for all the articles////////////////////////////////////////////////////////////////

app.route('/players')
  .get(function(req,res){
    Player.find(function(err,foundPlayers){
       if(!err){
           res.send(foundPlayers);
       }else{
           res.send(err);
       }
    })
   })
  .post(function(req,res){
    const newPlayer = new Player({
        name:req.body.name,
        about:req.body.about
    });

    newPlayer.save(function(err){
        if(!err){
            res.send("Succesfully Added a new player!")
        }else{
            res.send(err);
        }
    });
    
})
  .delete(function(req,res){
    Player.deleteMany(function(err){
        if(!err){
            res.send("Succesfully deleted all the items!")
        }else{
            res.send(err);
        }
    })
})

//////////////////////////////////////////////CRUD for specific player//////////////////////////////////////////////
app.route("/players/:playerName")

.get(function(req,res){
  Player.findOne({name:req.params.playerName},function(err,foundPlayer){
    if(foundPlayer){
        res.send(foundPlayer);
    }else{
        res.send("No Article Found!");
    }
  })
})

.put(function(req, res){

    Player.replaceOne(
      {name: req.params.playerName},
      {name: req.body.name, about: req.body.about},
      function(err){
        if(!err){
          res.send("Successfully updated the selected article.");
        }
      }
    );
  })

  .patch(function(req, res){

    Player.updateOne(
      {name: req.params.playerName},
      {$set: req.body},
      function(err){
        if(!err){
          res.send("Successfully updated article.");
        } else {
          res.send(err);
        }
      }
    );
  })

.delete(function(req,res){
    Player.deleteOne({name:req.params.playerName},function(err){
        if(!err){
            res.send("Successfully Deleted the selected article");
        }else{
            res.send(err);
        }
    })
});


app.listen(3000,function(){
    console.log("Server Started on port 3000 once again for cricketDB");
});


