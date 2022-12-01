const express = require("express")
const mongoose = require("mongoose")
const bodyParse = require("body-parser")
const app = express()
const route = require("./routes/route")
require("dotenv").config()

//Authencation portion using google=================================================
const passport = require("passport")

const GoogleStrategy = require('passport-google-oauth20').Strategy;
 
passport.use(new GoogleStrategy({
    clientID: `${process.env.clientID}`,
    clientSecret: `${process.env.clientSecret}`,
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile); 
  }
));

app.set('view engine','ejs')
//====================================================================================

app.use(bodyParse.json())

mongoose.connect(`mongodb+srv://ShivamKoushik:${process.env.cluster_Password}@cluster0.k1qkf.mongodb.net/${process.env.cluster_Name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})
.then(()=> console.log("Shivam your DB is connected"))
.catch((error)=> console.log(error))

app.use("/",route)

let port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})