const express = require("express")
const route = express.Router()
const passport = require("passport")
require("dotenv").config()

const signUpControllers = require("../controller/register")
const cropContrllers = require("../controller/crop")
const organizationController = require("../controller/organization")
const propertyController = require("../controller/property")
const regionController = require("../controller/region")
const fieldController = require("../controller/field")
const middlewareController = require("../middleware/middleware")
const stripeController = require("../controller/stripe")


//=================================================Payment Gateway=======================================================
route.get("/payment", (req, res) => res.render('payment', { key: process.env.Publishable_key }))
route.post("/stripePayment",(req,res)=>res.render('success'))
// route.post("/stripePayment", stripeController.stripePayment)

//==============================================Google Authentication====================================================
route.get("/", (req, res) => res.render('index'))
route.get('/google', passport.authenticate('google', { scope: ['profile'] }));
route.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => { res.render('/'); });

//=================================================Register Api==========================================================
route.post("/signUp", signUpControllers.signUp)
route.post("/login", signUpControllers.login)

//===============================================Organization Api========================================================
route.post("/createOrganization", organizationController.createOrganization)
route.put("/updateCropList/:organizationId", organizationController.updateCropList)

//=================================================Property Api==========================================================
route.post("/createProperty/:organizationId", propertyController.createProperty)
route.put("/updateProperty/:propertyId", propertyController.updateProperty)
route.get("/filterProperty", propertyController.filterProperty)

//==================================================Region Api===========================================================
route.post("/createRegion/:propertyId", regionController.createRegion)
route.put("/updateRegion/:regionId", regionController.updateRegion)
route.get("/listRegion", regionController.listRegion)

// =================================================Field Api============================================================
route.post("/createField/:userId", fieldController.createField)
route.get("/filterField/:userId", fieldController.filterField)

//===================================================crop Api============================================================
route.post("/createCrop/:userId", cropContrllers.createCrop)
route.get("/filterCrop/:cropId", middlewareController.authentication, middlewareController.authorisation, cropContrllers.filterCrop)
route.put("/updateCrop/:cropId", middlewareController.authentication, middlewareController.authorisation, cropContrllers.updateCrop)
route.delete("/deleteCrop/:cropId", middlewareController.authentication, middlewareController.authorisation, cropContrllers.deleteCrop)

module.exports = route