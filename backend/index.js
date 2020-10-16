const {MongoClient} = require('mongodb');
const bodyParser =require( "body-parser");
const mongoose = require('mongoose');
const express = require('express');
const port = process.env.PORT || 8000;
const app = express();
const router = require('express').Router();
const passport = require("passport");



app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

const BusStands= require('../backend/Routes/BusStands.routes');
const Users= require('../backend/Routes/User.routes');
const Reports = require('../backend/Routes/Reports.routes');
const Inspections = require('../backend/Routes/Inspections.routes');

app.use('/busStand', BusStands);
app.use('/user', Users);
app.use('/reports', Reports);
app.use('/inspections', Inspections);

//Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// // Routes
// app.use("/api/users", users);



const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb+srv://admin:admin@cluster0.2jb6q.mongodb.net/BusTicketing?retryWrites=true&w=majority", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo database Successfully connected");
})

app.listen(port, () => {
    console.log(`Server is running on port:  ${port}`);
})

