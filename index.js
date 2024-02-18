require("dotenv").config();
const express = require("express");
const mongoose =require("mongoose");
const bodyParser = require('body-parser');
const app =express();
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;
const path = require("path");
//const multer = require("multer");
const blogRoute = require("./routes/blogroutes");
const authRoute = require("./routes/authuserRoute");
const session = require('express-session');
const JWT_SECRET = process.env.JWT_SECRET;




// Set up middleware and view engine
app.use(session({ secret: JWT_SECRET, resave: true, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/blog",blogRoute);
app.use("/auth",authRoute);

mongoose.connect(MONGO_CONNECTION)
.then(()=>{
    console.log("connnected to mongodb cloud");
    app.listen(3001,()=>{
        console.log('Node api is running on port 3001');
    });
})
.catch((error)=>{
    console.log(error);
});

