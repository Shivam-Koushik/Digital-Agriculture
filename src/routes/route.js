const express = require("express")
const route = express.Router()
const passport = require("passport")
const signUpControllers = require("../controller/register")
const cropContrllers = require("../controller/crop")
const middlewareController = require("../middleware/middleware")

//____________________________Admin
route.get("/",(req,res)=>res.render('index'))
route.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));
 
route.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) =>{
    res.render('/');
  });

route.post("/signUp",signUpControllers.signUp)
route.post("/login",signUpControllers.login)
route.post("/createCrop/:userId",cropContrllers.createCrop)
route.get("/filterCrop/:cropId",middlewareController.authentication,middlewareController.authorisation,cropContrllers.filterCrop)
route.put("/updateCrop/:cropId",middlewareController.authentication,middlewareController.authorisation,cropContrllers.updateCrop)
route.delete("/deleteCrop/:cropId",middlewareController.authentication,middlewareController.authorisation,cropContrllers.deleteCrop)

module.exports = route