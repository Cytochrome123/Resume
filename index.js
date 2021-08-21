require("dotenv").config()
const express = require("express");
const path = require("path");


const mongoose = require("mongoose");
const contact = require("./models/message");

const Message = mongoose.model("Contact");

mongoose.connect("mongodb://localhost/HNG",{useUnifiedTopology: true, useNewUrlParser:true , useCreateIndex: true , useFindAndModify:false});

// mongoose.connect("mongodb+srv://Hud:ismail@hng.nymdr.mongodb.net/HNG001?retryWrites=true&w=majority",{useUnifiedTopology: true, useNewUrlParser:true , useCreateIndex: true , useFindAndModify:false});
 
mongoose.connection.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once("open", ()=>console.log("Database connected!!!"));


const app = express();

// app.engine("ejs", ejsMate)

app.use('/public', express.static('public'));


app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}))

app.get("/", (req,res)=>{
    res.render("home")
});

// app.get("/contact" , async (req,res)=>{
//     res.render("message")
// })
// app.post("/contact" , async(req,res)=>{
//     console.log(req.body)
//     const message = await new Message(req.body)
//     await message.save()
//     res.redirect("/")
//     res.send(err)
// })

app.post("/contact" , async(req,res)=>{
    try{
    const {fullName} = req.body
    console.log(req.body)
    const message = new Message(req.body)
    await message.save()
    res.render("success" , {fullName})
    }
    catch(err){
    console.log(err)
    }
})
app.get("/success", async(req,res)=>{
    res.render("success")
})
app.listen(process.env.PORT || 8000  , ()=> console.log("Resume"))