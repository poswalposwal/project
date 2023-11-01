const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const Review =  require("../models/review.js");// review model
const Listing =  require("../models/listing.js");//listing schema
const reviewController = require("../controllers/review.js")




//reviews post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
 
 //delete route for reviews
 
 router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));
 

 module.exports = router;