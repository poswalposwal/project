const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing =  require("../models/listing.js");//listing schema
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


//get and post requests for index and create route
router
.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn,  upload.single('listing[image]'),validateListing,wrapAsync( listingController.createListing
 ));

 

//New Route

router.get("/new", isLoggedIn,listingController.renderNewForm);



//get,put, and delete requests for show route and update route delete route
router
.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));



//edit Route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner, 
  wrapAsync(listingController.renderEditForm
));


module.exports = router;